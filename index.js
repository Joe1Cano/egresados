import mysql2 from 'mysql2'
import express from 'express'

const connection = mysql2.createConnection({
    host:"database-1.cecbgovk1crx.us-east-1.rds.amazonaws.com",
    port:"3306",
    database:"egresados",
    user:"admin",
    password:"univa1234"
})

const app = express();

const PORT = 5000;
app.use(express.json());

app.listen(PORT, ()=>{
    console.log(`Server : http://localhost:${PORT}`);
    connection.connect((err)=>{
        if(err) throw err;
        console.log("Database Connected")
    })
})


app.post("/add_alumn", (req,res)=>{
  const newData = req.body;
  connection.query(
    'INSERT INTO alumno (correo, Nombre, Apellido_p, Apellido_m, Genero, Matricula, Celular, Telefono_casa, Telefono_oficina, Fech_nac, Ciudad_res) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [
      newData.correo,
      newData.Nombre,
      newData.Apellido_p,
      newData.Apellido_m,
      newData.Genero,
      newData.Matricula,
      newData.Celular,
      newData.Telefono_casa,
      newData.Telefono_oficina,
      newData.Fech_nac,
      newData.Ciudad_res
    ],
    (err, results) => {
      if (err) {
        print(newData.correo)
        console.error('Error inserting data:', err);
        res.status(500).send(`Error inserting data: ${err.message}`);
        return;
      }

      console.log('Data inserted successfully');
      res.status(200).send('Data inserted successfully');
    }
  );
});


app.post("/add_aca", (req,res)=>{
  const newData = req.body;
  console.log(newData.correo)
  connection.query(
    'INSERT INTO info_aca (id_alm, campus, bach_ano_egr, bach_mod, bach_doc, lic_ano_egr, lic_mod, lic_doc, maes_ano_egr, maes_mod, maes_doc, doc_ano_egr, doc_mod, doc_doc, educ_ano_egr, educ_mod,educ_doc,Otro) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?,?)',
    [
      newData.id_alm,
      newData.campus,
      newData.bach_ano_egr,
      newData.bach_mod,
      newData.bach_doc,
      newData.lic_ano_egr,
      newData.lic_mod,
      newData.lic_doc,
      newData.maes_ano_egr,
      newData.maes_mod,
      newData.maes_doc,
      newData.doc_ano_egr, 
      newData.doc_mod, 
      newData.doc_doc, 
      newData.educ_ano_egr, 
      newData.educ_mod,
      newData.educ_doc,
      newData.Otro
    ],
    (err, results) => {
      if (err) {
        console.error('Error inserting data:', err);
        res.status(500).send(`Error inserting data: ${err.message}`);
        return;
      }

      console.log('Data inserted successfully');
      res.status(200).send('Data inserted successfully');
    }
  );
});

app.post("/add_lab", (req,res)=>{
  const newData = req.body;
  connection.query(
    'INSERT INTO info_lab( id_alm, trb_act, jornada, ocupacion, posicion, empl_gener, tel_emp, cd_emp, sect_emp, giro_emp, tmp_1erT, con_imp, con_fal, idm_ext, dip_ext, esp_ext, pos_ext, cert_ext, reconocimientos, publicaciones) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    [
      newData.id_alm,
      newData.trb_act,
      newData.jornada,
      newData.ocupacion,
      newData.posicion,
      newData.empl_gener,
      newData.tel_emp,
      newData.cd_emp,
      newData.sect_emp,
      newData.giro_emp,
      newData.tmp_1erT,
      newData.con_imp, 
      newData.con_fal, 
      newData.idm_ext, 
      newData.dip_ext, 
      newData.esp_ext,
      newData.pos_ext,
      newData.cert_ext,
      newData.reconocimientos,
      newData.publicaciones
    ],
    (err, results) => {
      if (err) {
        console.error('Error inserting data:', err);
        res.status(500).send(`Error inserting data: ${err.message}`);
        return;
      }

      console.log('Data inserted successfully');
      res.status(200).send('Data inserted successfully');
    }
  );
});

app.get("/alumnos", (req, res)=>{
    const sql_query = 'SELECT * from alumno;'
    connection.query(sql_query,(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

app.get("/info_academica", (req, res)=>{
  const sql_query = 'SELECT * from info_aca;'
  connection.query(sql_query,(err,result)=>{
      if(err) throw err;
      res.send(result);
  })
})

app.get("/info_laboral", (req, res)=>{
  const sql_query = 'SELECT * from info_lab;'
  connection.query(sql_query,(err,result)=>{
      if(err) throw err;
      res.send(result);
  })
})

app.get("/act_sobresalientes", (req, res)=>{
  const sql_query = 'SELECT * from act_sobresalientes;'
  connection.query(sql_query,(err,result)=>{
      if(err) throw err;
      res.send(result);
  })
})

app.get(`/datos_comp/:id`, (req, res)=>{
  const id = req.params.id;
  const sql_query = `CALL GetStudentInfo(${id});`
  connection.query(sql_query,(err,result)=>{
      if(err) throw err;
      res.send(result);
  })
})

app.put('/actualizar_alumno/:id', (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  const sql_query = `UPDATE alumno SET ? WHERE id = ?`;
  connection.query(sql_query, [updatedData, id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred while updating data." });
    } else {
      res.status(200).json({ message: `Data for student with ID ${id} updated successfully.` });
    }
  });
});

app.put('/actualizar_academica/:id', (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  const sql_query = `UPDATE info_aca SET ? WHERE id_alm = ?`;
  connection.query(sql_query, [updatedData, id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred while updating data." });
    } else {
      res.status(200).json({ message: `Data for student with ID ${id} updated successfully.` });
    }
  });
});

app.put('/actualizar_laboral/:id', (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  const sql_query = `UPDATE info_lab SET ? WHERE id_alm = ?`;
  connection.query(sql_query, [updatedData, id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred while updating data." });
    } else {
      res.status(200).json({ message: `Data for student with ID ${id} updated successfully.` });
    }
  });
});

app.put('/actualizar_actividad/:id', (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  const sql_query = `UPDATE act_sobresalientes SET ? WHERE id_reg = ?`;
  connection.query(sql_query, [updatedData, id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred while updating data." });
    } else {
      res.status(200).json({ message: `Data for student with ID ${id} updated successfully.` });
    }
  });
});

app.delete(`/borrar_alumno/:id`, (req, res)=>{
  const id = req.params.id;
  const sql_query = `CALL BorrarAlumno(${id});`
  connection.query(sql_query,(err,result)=>{
      if(err) throw err;
      res.send(result);
  })
})