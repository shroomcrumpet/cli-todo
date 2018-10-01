
// console.log("process.argv[2]: ", process.argv[2]);

const pg = require('pg');

const configs = {
    user: 'kencheng',
    host: '127.0.0.1',
    database: 'todo',
    port: 5432,
};

const client = new pg.Client(configs);



let clientConnectionCallback = (err) => {

  if (err) {console.log( "error", err.message );}

  let text;

  if (process.argv[2] === "show") {

    text = "select * from todolist";

    client.query(text, queryDoneCallback);

  } else if (process.argv[2] === "add") {

    text = "INSERT INTO todolist (completed, entry, timeadded) VALUES ($1, $2, $3) RETURNING id";

    let values = [false, process.argv[3], new Date()];

    client.query(text, values, queryDoneCallback);

  };
};



let queryDoneCallback = (err, result) => {

    if (err) {console.log("query error", err.message);}

    else {

    console.log("To-Do List:");

      for (i in result.rows) {

        let checkBox;

        if (result.rows[i].completed === true ) {checkBox = 'X';}

        else {checkBox = ' ';};

        let output = `${result.rows[i].id}. [${checkBox}] - ${result.rows[i].entry}`

        console.log(output)

      };

      // console.log("result", result.rows );
    };
};



client.connect(clientConnectionCallback);








