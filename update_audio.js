const fs = require('fs');

const userData = {
    "jeem-tile-01": "/extracted_audio/sound_1278.mp3",
    "jeem-tile-02": "/extracted_audio/sound_1282.mp3",
    "jeem-tile-03": "/extracted_audio/sound_1286.mp3",
    "jeem-tile-04": "/extracted_audio/sound_1290.mp3",
    "jeem-tile-05": "/extracted_audio/sound_1294.mp3",
    "jeem-tile-06": "/extracted_audio/sound_1298.mp3",
    "jeem-tile-07": "/extracted_audio/sound_1302.mp3",
    "jeem-tile-08": "/extracted_audio/sound_1306.mp3",
    "jeem-tile-09": "/extracted_audio/sound_1310.mp3",
    "jeem-tile-10": "/extracted_audio/sound_1314.mp3",
    "jeem-info": "/extracted_audio/sound_1329.mp3",
    "jeem-word-01": "/extracted_audio/sound_1336.mp3",
    "jeem-word-02": "/extracted_audio/sound_1342.mp3",
    "jeem-example": "/extracted_audio/sound_1349.mp3",
    "jeem-main": "/extracted_audio/sound_1365.mp3",
    "nye-tile-01": "/extracted_audio/sound_1386.mp3",
    "nye-tile-02": "/extracted_audio/sound_1390.mp3",
    "nye-tile-03": "/extracted_audio/sound_1394.mp3",
    "nye-tile-04": "/extracted_audio/sound_1398.mp3",
    "nye-tile-05": "/extracted_audio/sound_1402.mp3",
    "nye-tile-06": "/extracted_audio/sound_1406.mp3",
    "nye-tile-07": "/extracted_audio/sound_1410.mp3",
    "nye-tile-08": "/extracted_audio/sound_1414.mp3",
    "nye-tile-09": "/extracted_audio/sound_1418.mp3",
    "nye-tile-10": "/extracted_audio/sound_1422.mp3",
    "nye-word-01": "/extracted_audio/sound_1439.mp3",
    "nye-word-02": "/extracted_audio/sound_1446.mp3",
    "nye-example": "/extracted_audio/sound_1453.mp3",
    "nye-main": "/extracted_audio/sound_1469.mp3",
    "jhe-tile-01": "/extracted_audio/sound_1490.mp3",
    "jhe-tile-02": "/extracted_audio/sound_1493.mp3",
    "jhe-tile-03": "/extracted_audio/sound_1497.mp3",
    "jhe-tile-04": "/extracted_audio/sound_1500.mp3",
    "jhe-tile-05": "/extracted_audio/sound_1504.mp3",
    "jhe-tile-06": "/extracted_audio/sound_1508.mp3",
    "jhe-tile-07": "/extracted_audio/sound_1511.mp3",
    "jhe-tile-08": "/extracted_audio/sound_1514.mp3",
    "jhe-tile-09": "/extracted_audio/sound_1517.mp3",
    "jhe-tile-10": "/extracted_audio/sound_1521.mp3",
    "jhe-word-01": "/extracted_audio/sound_1543.mp3",
    "jhe-word-02": "/extracted_audio/sound_1549.mp3",
    "jhe-example": "/extracted_audio/sound_1556.mp3",
    "jhe-main": "/extracted_audio/sound_1588.mp3",
    "nyay-tile-01": "/extracted_audio/sound_1607.mp3",
    "nyay-tile-02": "/extracted_audio/sound_1610.mp3",
    "nyay-tile-03": "/extracted_audio/sound_1613.mp3",
    "nyay-tile-04": "/extracted_audio/sound_1616.mp3",
    "nyay-tile-05": "/extracted_audio/sound_1619.mp3",
    "nyay-tile-06": "/extracted_audio/sound_1622.mp3",
    "nyay-tile-07": "/extracted_audio/sound_1625.mp3",
    "nyay-tile-08": "/extracted_audio/sound_1629.mp3",
    "nyay-tile-09": "/extracted_audio/sound_1632.mp3",
    "nyay-tile-10": "/extracted_audio/sound_1636.mp3",
    "nyay-word-01": "/extracted_audio/sound_1653.mp3",
    "nyay-word-02": "/extracted_audio/sound_1663.mp3",
    "nyay-example": "/extracted_audio/sound_1669.mp3",
    "nyay-main": "/extracted_audio/sound_1688.mp3",
    "che-tile-01": "/extracted_audio/sound_1706.mp3",
    "che-tile-02": "/extracted_audio/sound_1709.mp3",
    "che-tile-03": "/extracted_audio/sound_1712.mp3",
    "che-tile-04": "/extracted_audio/sound_1715.mp3",
    "che-tile-05": "/extracted_audio/sound_1718.mp3",
    "che-tile-06": "/extracted_audio/sound_1721.mp3",
    "che-tile-07": "/extracted_audio/sound_1724.mp3",
    "che-tile-08": "/extracted_audio/sound_1727.mp3",
    "che-tile-09": "/extracted_audio/sound_1730.mp3",
    "che-tile-10": "/extracted_audio/sound_1733.mp3",
    "che-word-01": "/extracted_audio/sound_1748.mp3",
    "che-word-02": "/extracted_audio/sound_1755.mp3",
    "che-info": "/extracted_audio/sound_1760.mp3",
    "che-example": "/extracted_audio/sound_1767.mp3",
    "che-main": "/extracted_audio/sound_1784.mp3",
    "chhe-tile-01": "/extracted_audio/sound_1801.mp3",
    "chhe-tile-02": "/extracted_audio/sound_1804.mp3",
    "chhe-tile-03": "/extracted_audio/sound_1807.mp3",
    "chhe-tile-04": "/extracted_audio/sound_1810.mp3",
    "chhe-tile-05": "/extracted_audio/sound_1813.mp3",
    "chhe-tile-06": "/extracted_audio/sound_1816.mp3",
    "chhe-tile-07": "/extracted_audio/sound_1819.mp3",
    "chhe-tile-08": "/extracted_audio/sound_1822.mp3",
    "chhe-tile-09": "/extracted_audio/sound_1825.mp3",
    "chhe-tile-10": "/extracted_audio/sound_1828.mp3",
    "chhe-word-01": "/extracted_audio/sound_1850.mp3",
    "chhe-word-02": "/extracted_audio/sound_1857.mp3",
    "chhe-main": "/extracted_audio/sound_1875.mp3",
    "he-tile-01": "/extracted_audio/sound_1892.mp3",
    "he-tile-02": "/extracted_audio/sound_1895.mp3",
    "he-tile-03": "/extracted_audio/sound_1898.mp3",
    "he-tile-04": "/extracted_audio/sound_1901.mp3",
    "he-tile-05": "/extracted_audio/sound_1904.mp3",
    "he-tile-06": "/extracted_audio/sound_1907.mp3",
    "he-tile-07": "/extracted_audio/sound_1911.mp3",
    "he-tile-08": "/extracted_audio/sound_1914.mp3",
    "he-tile-09": "/extracted_audio/sound_1917.mp3",
    "he-tile-10": "/extracted_audio/sound_1920.mp3",
    "he-info": "/extracted_audio/sound_1933.mp3",
    "he-word-01": "/extracted_audio/sound_1940.mp3",
    "he-word-02": "/extracted_audio/sound_1945.mp3",
    "he-example": "/extracted_audio/sound_1951.mp3",
    "he-main": "/extracted_audio/sound_1965.mp3",
    "khe-tile-01": "/extracted_audio/sound_1982.mp3",
    "khe-tile-02": "/extracted_audio/sound_1985.mp3",
    "khe-tile-03": "/extracted_audio/sound_1988.mp3",
    "khe-tile-04": "/extracted_audio/sound_1992.mp3",
    "khe-tile-05": "/extracted_audio/sound_1996.mp3",
    "khe-tile-06": "/extracted_audio/sound_2000.mp3",
    "khe-tile-07": "/extracted_audio/sound_2003.mp3",
    "khe-tile-08": "/extracted_audio/sound_2006.mp3",
    "khe-tile-09": "/extracted_audio/sound_2009.mp3",
    "khe-tile-10": "/extracted_audio/sound_2013.mp3",
    "khe-word-01": "/extracted_audio/sound_2028.mp3",
    "khe-word-02": "/extracted_audio/sound_2035.mp3",
    "khe-example": "/extracted_audio/sound_2041.mp3",
    "khe-main": "/extracted_audio/sound_2056.mp3",
    "dal-tile-01": "/extracted_audio/sound_2081.mp3",
    "dal-tile-02": "/extracted_audio/sound_2085.mp3",
    "dal-tile-03": "/extracted_audio/sound_2089.mp3",
    "dal-tile-04": "/extracted_audio/sound_2093.mp3",
    "dal-tile-05": "/extracted_audio/sound_2096.mp3",
    "dal-tile-06": "/extracted_audio/sound_2099.mp3",
    "dal-tile-07": "/extracted_audio/sound_2102.mp3",
    "dal-tile-08": "/extracted_audio/sound_2105.mp3",
    "dal-tile-09": "/extracted_audio/sound_2108.mp3",
    "dal-tile-10": "/extracted_audio/sound_2111.mp3",
    "dal-word-01": "/extracted_audio/sound_2127.mp3",
    "dal-word-02": "/extracted_audio/sound_2132.mp3",
    "dal-info": "/extracted_audio/sound_2136.mp3",
    "dal-example": "/extracted_audio/sound_2142.mp3",
    "dal-main": "/extracted_audio/sound_2153.mp3",
    "dhal-tile-01": "/extracted_audio/sound_2170.mp3",
    "dhal-tile-02": "/extracted_audio/sound_2173.mp3",
    "dhal-tile-03": "/extracted_audio/sound_2176.mp3",
    "dhal-tile-04": "/extracted_audio/sound_2179.mp3",
    "dhal-tile-05": "/extracted_audio/sound_2182.mp3",
    "dhal-tile-06": "/extracted_audio/sound_2185.mp3",
    "dhal-tile-07": "/extracted_audio/sound_2188.mp3",
    "dhal-tile-08": "/extracted_audio/sound_2191.mp3",
    "dhal-tile-09": "/extracted_audio/sound_2194.mp3",
    "dhal-tile-10": "/extracted_audio/sound_2197.mp3",
    "dhal-word-01": "/extracted_audio/sound_2214.mp3",
    "dhal-word-02": "/extracted_audio/sound_2220.mp3",
    "dhal-example": "/extracted_audio/sound_2226.mp3",
    "dhal-main": "/extracted_audio/sound_2233.mp3",
    "ddal-tile-01": "/extracted_audio/sound_2340.mp3",
    "ddal-tile-02": "/extracted_audio/sound_2343.mp3",
    "ddal-tile-03": "/extracted_audio/sound_2347.mp3",
    "ddal-tile-04": "/extracted_audio/sound_2351.mp3",
    "ddal-tile-05": "/extracted_audio/sound_2355.mp3",
    "ddal-tile-06": "/extracted_audio/sound_2358.mp3",
    "ddal-tile-07": "/extracted_audio/sound_2361.mp3",
    "ddal-tile-08": "/extracted_audio/sound_2364.mp3",
    "ddal-tile-09": "/extracted_audio/sound_2367.mp3",
    "ddal-tile-10": "/extracted_audio/sound_2370.mp3",
    "ddal-word-01": "/extracted_audio/sound_2295.mp3",
    "ddal-word-02": "/extracted_audio/sound_2305.mp3",
    "ddal-example": "/extracted_audio/sound_2312.mp3",
    "ddal-main": "/extracted_audio/sound_2320.mp3",
    "ddha-tile-01": "/extracted_audio/sound_2424.mp3",
    "ddha-tile-02": "/extracted_audio/sound_2428.mp3",
    "ddha-tile-03": "/extracted_audio/sound_2432.mp3",
    "ddha-tile-04": "/extracted_audio/sound_2436.mp3",
    "ddha-tile-05": "/extracted_audio/sound_2441.mp3",
    "ddha-tile-06": "/extracted_audio/sound_2445.mp3",
    "ddha-tile-07": "/extracted_audio/sound_2448.mp3",
    "ddha-tile-08": "/extracted_audio/sound_2451.mp3",
    "ddha-tile-09": "/extracted_audio/sound_2454.mp3",
    "ddha-tile-10": "/extracted_audio/sound_2457.mp3",
    "ddha-word-01": "/extracted_audio/sound_2384.mp3",
    "ddha-word-02": "/extracted_audio/sound_2390.mp3",
    "ddha-example": "/extracted_audio/sound_2397.mp3",
    "ddha-info": "/extracted_audio/sound_2401.mp3",
    "ddha-main": "/extracted_audio/sound_2424.mp3",
    "ddhal-tile-01": "/extracted_audio/sound_2428.mp3",
    "ddhal-tile-02": "/extracted_audio/sound_2432.mp3",
    "ddhal-tile-03": "/extracted_audio/sound_2436.mp3",
    "ddhal-tile-04": "/extracted_audio/sound_2441.mp3",
    "ddhal-tile-05": "/extracted_audio/sound_2445.mp3",
    "ddhal-tile-06": "/extracted_audio/sound_2448.mp3",
    "ddhal-tile-07": "/extracted_audio/sound_2451.mp3",
    "ddhal-tile-08": "/extracted_audio/sound_2454.mp3",
    "ddhal-tile-09": "/extracted_audio/sound_2457.mp3",
    "ddhal-tile-10": "/extracted_audio/sound_2282.mp3",
    "ddhal-word-01": "/extracted_audio/sound_2471.mp3",
    "ddhal-word-02": "/extracted_audio/sound_2477.mp3",
    "ddhal-example": "/extracted_audio/sound_2483.mp3",
    "ddhal-main": "/extracted_audio/sound_2490.mp3",
    "zal-tile-01": "/extracted_audio/sound_2510.mp3",
    "zal-tile-02": "/extracted_audio/sound_2513.mp3",
    "zal-tile-03": "/extracted_audio/sound_2516.mp3",
    "zal-tile-04": "/extracted_audio/sound_2520.mp3",
    "zal-tile-05": "/extracted_audio/sound_2524.mp3",
    "zal-tile-06": "/extracted_audio/sound_2527.mp3",
    "zal-tile-07": "/extracted_audio/sound_2530.mp3",
    "zal-tile-08": "/extracted_audio/sound_2533.mp3",
    "zal-tile-09": "/extracted_audio/sound_2536.mp3",
    "zal-tile-10": "/extracted_audio/sound_2539.mp3",
    "zal-word-01": "/extracted_audio/sound_2553.mp3",
    "zal-word-02": "/extracted_audio/sound_2559.mp3",
    "zal-example": "/extracted_audio/sound_2565.mp3",
    "zal-info": "/extracted_audio/sound_2569.mp3",
    "zal-main": "/extracted_audio/sound_2575.mp3",
    "re-tile-01": "/extracted_audio/sound_2590.mp3",
    "re-tile-02": "/extracted_audio/sound_2593.mp3",
    "re-tile-03": "/extracted_audio/sound_2596.mp3",
    "re-tile-04": "/extracted_audio/sound_2599.mp3",
    "re-tile-05": "/extracted_audio/sound_2602.mp3",
    "re-tile-06": "/extracted_audio/sound_2605.mp3",
    "re-tile-07": "/extracted_audio/sound_2609.mp3",
    "re-tile-08": "/extracted_audio/sound_2613.mp3",
    "re-tile-09": "/extracted_audio/sound_2616.mp3",
    "re-tile-10": "/extracted_audio/sound_2619.mp3",
    "re-word-01": "/extracted_audio/sound_2632.mp3",
    "re-word-02": "/extracted_audio/sound_2638.mp3",
    "re-info": "/extracted_audio/sound_2642.mp3",
    "re-example": "/extracted_audio/sound_2649.mp3",
    "re-main": "/extracted_audio/sound_2660.mp3",
    "rre-tile-01": "/extracted_audio/sound_2679.mp3",
    "rre-tile-02": "/extracted_audio/sound_2682.mp3",
    "rre-tile-03": "/extracted_audio/sound_2685.mp3",
    "rre-tile-04": "/extracted_audio/sound_2688.mp3",
    "rre-tile-05": "/extracted_audio/sound_2691.mp3",
    "rre-tile-06": "/extracted_audio/sound_2695.mp3",
    "rre-tile-07": "/extracted_audio/sound_2699.mp3",
    "rre-tile-08": "/extracted_audio/sound_2703.mp3",
    "rre-tile-09": "/extracted_audio/sound_2706.mp3",
    "rre-tile-10": "/extracted_audio/sound_2709.mp3",
    "rre-word-01": "/extracted_audio/sound_2727.mp3",
    "rre-word-02": "/extracted_audio/sound_2733.mp3",
    "rre-example": "/extracted_audio/sound_2739.mp3",
    "rre-main": "/extracted_audio/sound_2748.mp3",
    "ze-tile-01": "/extracted_audio/sound_2768.mp3",
    "ze-tile-02": "/extracted_audio/sound_2771.mp3",
    "ze-tile-03": "/extracted_audio/sound_2775.mp3",
    "ze-tile-04": "/extracted_audio/sound_2779.mp3",
    "ze-tile-05": "/extracted_audio/sound_2783.mp3",
    "ze-tile-06": "/extracted_audio/sound_2786.mp3",
    "ze-tile-07": "/extracted_audio/sound_2789.mp3",
    "ze-tile-08": "/extracted_audio/sound_2793.mp3",
    "ze-tile-09": "/extracted_audio/sound_2796.mp3",
    "ze-tile-10": "/extracted_audio/sound_2800.mp3",
    "ze-info": "/extracted_audio/sound_2810.mp3",
    "ze-word-01": "/extracted_audio/sound_2816.mp3",
    "ze-word-02": "/extracted_audio/sound_2822.mp3",
    "ze-example": "/extracted_audio/sound_2829.mp3",
    "ze-main": "/extracted_audio/sound_2835.mp3"
};

const filePath = 'public/stage-experience.js';
let fileContent = fs.readFileSync(filePath, 'utf-8');
const lines = fileContent.split('\n');

const outLines = [];
let insideBaseExtractedStageAudio = false;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Naive state tracking for inside baseExtractedStageAudio block down to closing brace
    if (line.includes('const baseExtractedStageAudio = {') && !line.includes('}')) {
        insideBaseExtractedStageAudio = true;
    }

    // We end baseExtractedStageAudio either by Object.assign or reaching specific closing braces
    if (insideBaseExtractedStageAudio && line.includes('Object.assign(baseExtractedStageAudio')) {
        insideBaseExtractedStageAudio = false;
    }

    if (insideBaseExtractedStageAudio) {
        // Find keys in the form "key": "value",
        const match = line.match(/^\s*["']([^"']+)["']\s*:\s*["']([^"']+)["'],?\s*$/);
        if (match) {
            const key = match[1];
            if (userData[key]) {
                outLines.push('    "' + key + '": "' + userData[key] + '",');
                delete userData[key]; // mark as processed
            } else {
                outLines.push(line);
            }
        } else {
            outLines.push(line);
        }
    } else {
        outLines.push(line);
    }
}

// Check if any userData items were not added
const remainingKeys = Object.keys(userData);
if (remainingKeys.length > 0) {
    for (let i = 0; i < outLines.length; i++) {
        if (outLines[i].includes('Object.assign(baseExtractedStageAudio, {')) {
            // Find the generic ending of baseExtractedStageAudio object before this point
            for (let j = i - 1; j >= 0; j--) {
                if (outLines[j].trim() === '};') {
                    // insert right before the closing brace
                    for (const key of remainingKeys) {
                        outLines.splice(j, 0, '    "' + key + '": "' + userData[key] + '",');
                    }
                    break;
                }
            }
            break;
        }
    }
}

fs.writeFileSync(filePath, outLines.join('\n'));
console.log("Updated " + filePath);
