/*
class UserController {

    constructor(formId, tableId) {

        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);

        this.onSubmit();


    }

    onSubmit() {//Grava os dados ao clicar no botão e adiciona uma linha com os dados na tela

        // Arrow fuction: Não precisa da palavra "Function" e se for somente um argumento não precisa de 
        //Parênteses.
        this.formId.addEventListener("submit", event => {

            event.preventDefault();//Cancela o comportamento padrão de atualizar a página, ele grava os dados mas
            //se mantem na mesma página.

            let values = this.getValues();

            values.photo = "";

            this.getPhotos();

            this.addline(this.getValues());

        });

    }

    getPhotos(){

        //Quando usamos o comando NEW FILEREADER()" já invoca o método construtor
        let fileReader = new fileReader();

        // filter serve para filtrar um elemento do array específico
        let elements = [...this.formEl.elements].filter (item => {
            console.log(elements)
            
            if (item.name === "photo"){
                 return item;
            }

        });
        console.log([...this.formEl.elements]);
        console.log(elements);

        //CALLBACK - Função usada como retorno após a execução de uma rotina
        fileReader.onLoad = () =>{

        };

        fileReader.readAsDataUrl();
    }

    getValues() {// Método captura os dados do usuário

        let user = {};//Variável que armazena o Json

        // SPREAD - tentamos buscar um elemento "array" porém de HTML, o spread é usado para descrever quantos 
        //índices o array possuí, mesmo sendo de HTML. Comando: [...] como mostra abaixo. 
       
        [...this.formEl.elements].forEach(function (field, index) {

            if (field.name == "gender") {

                if (field.checked) {
                    user[field.name] = field.value;

                }
            } else {

                user[field.name] = field.value;
            }


        });

        return new User(
            user.name,
            user.gender,
            user.birth,
            user.country,
            user.email,
            user.password,
            user.photo,
            user.admin
        );


    }

    addline(dataUser) {

        //Usado Template string, usando novo modelo de ${} ao invés de concatenar com +
        this.tableEl.innerHTML = `
        <tr>
            <td><img src=${dataUser.photo} alt="User Image" class="img-circle img-sm"></td>
            <td>${dataUser.name}</td> 
            <td>${dataUser.email}</td>
            <td>${dataUser.admin}</td>
            <td>${dataUser.birth}</td>
            <td>
                <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
      </tr>
      
      `;

    }
}
*/