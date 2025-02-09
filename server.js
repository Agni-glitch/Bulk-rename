const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
app.use(express.json());

app.use(express.static('./public'))

app.post("/rename", (req, res) => {
  const { replaceThis, replaceWith } = req.body;
  const preview = false;
  const folder = __dirname;
  fs.readdir(folder, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error reading directory" });
    }

    try {
      for (let index = 0; index < data.length; index++) {
        const item = data[index];
        let oldFile = path.join(folder, item);
        let newFile = path.join(
          folder,
          item.replaceAll(replaceThis, replaceWith)
        );

        if (!preview) {
          // Rename the file
          fs.rename(oldFile, newFile, (err) => {
            if (err) {
              console.error(err);
              return res
                .status(500)
                .json({ error: "Error renaming file", file: oldFile });
            }
          });
        } else {
          if (oldFile !== newFile)
            console.log(oldFile, "will be renamed to", newFile);
        }
      }
      res.json({ message: "Rename process completed" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error during renaming process" });
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
