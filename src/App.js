import React from 'react';
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from 'reactstrap';

const data = [
{ id: 1, nombre: "Juan Perez", horas: 160, iss: 0, afp: 0, renta: 0, sueldoL: 0, sueldoNeto: 0},
{ id: 2, nombre: "Mario Ramirez", horas: 80, iss: 0, afp: 0, renta: 0, sueldoL: 0, sueldoNeto: 0 },

  
];

class App extends React.Component{

  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      nombre: "",
      horas: "",
      iss: "",
      afp: "",
      renta: "",
      sueldoL: "",
      sueldoNeto: "",
    },
  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  prueba(horas){
    
    if(horas<=160){
      console.log("Las horas son menores a 160 horas");
      return horas=horas*9.75
    }if(horas>160&&horas<=200){
      console.log("Las horas son mayores a 160");
      return ((horas-160)*11.50)+(160*9.75)  
    }else{
      //por que hizo mas horas profe no sabía como hacer :c
      return horas*12.50
    }
  }

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  Editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id == registro.id) {
        arreglo[contador].nombre = dato.nombre;
        arreglo[contador].horas = dato.horas;
        arreglo[contador].iss = dato.iss;
        arreglo[contador].afp = dato.afp;
        arreglo[contador].renta = dato.renta;
        arreglo[contador].sueldoL = dato.sueldoL;
        arreglo[contador].sueldoNeto = dato.sueldoNeto;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento "+dato.id);
    if (opcion == true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id == registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar= ()=>{
    var valorNuevo= {...this.state.form};
    valorNuevo.id=this.state.data.length+1;
    var lista= this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  
  

  render(){
    return(
      <>
      <Container>
        <br />
          <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Insertar Nuevo Empleado</Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Horas(por Mes)</th>
                <th>ISS</th>
                <th>AFP</th>
                <th>Renta</th>
                <th>SueldoL</th>
                <th>SueldoNeto</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.nombre}</td>
                  <td>{dato.horas}</td>
                  <td>${(0.0525*this.prueba(dato.horas)).toFixed(2)}</td>
                  <td>${(0.0688*this.prueba(dato.horas)).toFixed(2)}</td>
                  <td>${(0.1*this.prueba(dato.horas)).toFixed(2)}</td>
                  <td>${(this.prueba(dato.horas)-((0.0525*this.prueba(dato.horas))+(0.0688*this.prueba(dato.horas))+(0.1*this.prueba(dato.horas)))).toFixed(2)}</td>
                  <td>${(this.prueba(dato.horas)).toFixed(2)}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={()=> this.eliminar(dato)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               Id:
              </label>
            
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Nombre: 
              </label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.nombre}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Horas: 
              </label>
              <input
                className="form-control"
                name="horas"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.horas}
              />
            </FormGroup>

            <FormGroup>
              <label>
                ISS: 
              </label>
              <input
                className="form-control"
                name="iss"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.iss}
              />
            </FormGroup>

            <FormGroup>
              <label>
                AFP: 
              </label>
              <input
                className="form-control"
                name="afp"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.afp}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Renta: 
              </label>
              <input
                className="form-control"
                name="renta"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.renta}
              />
            </FormGroup>

            <FormGroup>
              <label>
                SueldoL: 
              </label>
              <input
                className="form-control"
                name="sueldoL"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.sueldoL}
              />
            </FormGroup>

            <FormGroup>
              <label>
                SueldoNeto: 
              </label>
              <input
                className="form-control"
                name="sueldoNeto"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.sueldoNeto}
              />
            </FormGroup>

          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >

              Actualizar
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
           <div><h3>Insertar Nuevo empleado</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id: 
              </label>
              
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length+1}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Nombre: 
              </label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Horas: 
              </label>
              <input
                className="form-control"
                name="horas"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar()}
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

      </>
    )
  }
}

export default App;
