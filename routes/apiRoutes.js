
const fs = require('fs');

module.exports = function(app) {

    app.get("/api/notes", function(req, res) {
        fs.readFile('db/db.json', 'utf8', (error, data) =>
        {
            if (error) console.log(error);
            console.log(data);
            data = JSON.parse(data);
            console.log(data);
            res.json(data);
        }
        );
        
    });

    app.post("/api/notes", function(req, res) {
        fs.readFile('db/db.json', 'utf8', (error, data) =>
        {
            if (error) console.log(error);
            data = JSON.parse(data);
            req.body.id= Date.now();
            data.push(req.body)
            fs.writeFile('db/db.json', JSON.stringify(data), (err) => {            
            err ? console.error(err) : console.log('Success!')
            res.json(data)
            }
            );
        }
        );
        
    });

    app.delete("/api/notes/:id", function(req, res) {
        var id = req.params.id;
        fs.readFile("db/db.json", "utf8", (error, data) =>
        {
            if (error) console.log(error);
            data = JSON.parse(data);
            date = data.filter(notes => notes.id != id)
            fs.writeFile("db/db.json", JSON.stringify(date), (err) => {            
            err ? console.error(err) : console.log("Success!")
            res.json(data)
            })
        })
    })

    app.post("/api/clear", function(req, res) {
        // Empty out the arrays of data
        noteData.length = 0;
        
        res.json({ ok: true });
    });
};