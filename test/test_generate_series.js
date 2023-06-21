
exports.test = function(sql, assert){
    // Create a database
    var db = new sql.Database();

    //db.run('SELECT _sqlite3_series_init();');

    var result = db.exec("SELECT * FROM generate_series(1,5);");
    assert.deepEqual(result, [{columns:['generate_series'], values:[[1],[2],[3],[4],[5]]}], "generate_series(1,5)");

    // Close the database and all associated statements
    db.close();
};

if (module == require.main) {
	const target_file = process.argv[2];
  const sql_loader = require('./load_sql_lib');
  sql_loader(target_file).then((sql)=>{
    require('test').run({
      'test generate series': function(assert){
        exports.test(sql, assert);
      }
    });
  })
  .catch((e)=>{
    console.error(e);
    assert.fail(e);
  });
}

