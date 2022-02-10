const h = require('preact').h
const render = require('preact-render-to-string')
const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser');
const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.static("resources"))
app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized:true,
  secret: "Shh, its a secret!"
}));

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
  let x = req.session.x || 0
  if (args.addx) x += 1
  if (args.subx) x = Math.max(0, x - 1)
  req.session.x = x
  
  res.send(render(
    <body>
      <link rel="stylesheet" href="tally.css"/>
      <h1>Tally</h1>
      <button onclick="rr(this)" action="addx">+</button>
      <button onclick="rr(this)" action="subx">-</button>
      <NaturalNumbersList end={x} />
    </body>
  ))
})

const port = 8080
app.listen(port, () => console.log(`Example app is listening on http://localhost:${port}.`));
