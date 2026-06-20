#!/usr/bin/env node
/**
 * Downloads Singapore buildings data from GitHub and saves it locally.
 * Run: node scripts/download-data.js
 */

const https = require("https");
const fs = require("fs");
const path = require("path");

const DATA_URL =
  "https://raw.githubusercontent.com/xkjyeah/singapore-postal-codes/refs/heads/master/buildings.json";

const OUTPUT_DIR = path.join(__dirname, "../public/data");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "buildings.json");

function download(url, dest) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(path.dirname(dest))) {
      fs.mkdirSync(path.dirname(dest), { recursive: true });
    }

    console.log(`Downloading buildings data from GitHub...`);
    const file = fs.createWriteStream(dest);

    https
      .get(url, (response) => {
        if (response.statusCode === 301 || response.statusCode === 302) {
          file.close();
          return download(response.headers.location, dest).then(resolve).catch(reject);
        }

        if (response.statusCode !== 200) {
          file.close();
          fs.unlinkSync(dest);
          return reject(new Error(`Failed to download: HTTP ${response.statusCode}`));
        }

        let downloaded = 0;
        response.on("data", (chunk) => {
          downloaded += chunk.length;
          process.stdout.write(`\r  Downloaded: ${(downloaded / 1024 / 1024).toFixed(1)} MB`);
        });

        response.pipe(file);
        file.on("finish", () => {
          file.close();
          console.log(`\n  Saved to: ${dest}`);
          resolve();
        });
      })
      .on("error", (err) => {
        fs.unlinkSync(dest);
        reject(err);
      });
  });
}

async function main() {
  if (fs.existsSync(OUTPUT_FILE)) {
    const stats = fs.statSync(OUTPUT_FILE);
    const ageMs = Date.now() - stats.mtimeMs;
    const ageHours = ageMs / 1000 / 60 / 60;

    if (ageHours < 24) {
      console.log(`Data file exists and is ${ageHours.toFixed(1)}h old — skipping download.`);
      return;
    }
    console.log(`Data file is ${ageHours.toFixed(1)}h old — refreshing.`);
  }

  try {
    await download(DATA_URL, OUTPUT_FILE);

    // Validate JSON
    const raw = fs.readFileSync(OUTPUT_FILE, "utf-8");
    const data = JSON.parse(raw);
    console.log(`  Validated: ${data.length.toLocaleString()} buildings loaded.`);
  } catch (err) {
    console.error("Failed to download data:", err.message);
    if (!fs.existsSync(OUTPUT_FILE)) {
      process.exit(1);
    }
    console.log("Using existing cached file.");
  }
}

main();
