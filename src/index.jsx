const h = require('preact').h
const render = require('preact-render-to-string')
const express = require('express')
const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.static("resources"))

function range (from, to) {
  if (to == undefined) {
    to = from
    from = 0
  }
  let output = []
  for (let i = from; i < to; ++i) {
    output.push(i)
  }
  return output
}

function NaturalNumbersList ({end}) {
  return <ul>
           {range(1, end + 1).map(i =>
             <li>{i}</li>)}
         </ul>
}

app.all("/tally", (req, res) => {
  let args = {...req.query, ...req.body}
  let x = parseInt(args.x) || 0

  res.send(render(
    <body>
      <link rel="stylesheet" href="tally.css"/>
      <h1>Tally</h1>
      <button onclick="rr(this)" name="x" value={x + 1}>+</button>
      <NaturalNumbersList end={x} />
    </body>
  ))
})

const port = 8080
app.listen(port, () => console.log(`Example app is listening on http://localhost:${port}.`));
