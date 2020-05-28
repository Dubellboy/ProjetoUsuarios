class UserController {

    constructor(formId, tableId) {

        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);

        this.onSubmit();
        this.onEdit();


    }
    onEdit(){

        document.querySelector("#box-user-update .btn-cancel").addEventListener("click", e=>{

            this.showPanelCreate();

        });
    }
    //Operação ternária: condição ? 'Valor para verdadeiro' : 'Valor para falso'
    // Required é um atributo que se coloca em HTML para obrigar o campo a ser preenchido

    onSubmit() {//Grava os dados ao clicar no botão e adiciona uma linha com os dados na tela

        // Arrow fuction: Não precisa da palavra "Function" e se for somente um argumento não precisa de 
        //Parênteses.
        this.formEl.addEventListener("submit", event => {

            //Cancela o comportamento padrão de atualizar a página, ele grava os dados mas
            //se mantem na mesma página.
            event.preventDefault();

            let btn = this.formEl.querySelector("[type=submit]")//Retornar o botão submit,
            
            btn.disable = true; //disable é para deixar o botão desabilitado.
            
            let values = this.getValues();

            if(!values) return false;

            this.getPhoto().then(// Usando a promisse
             (content)=>{

                values.photo = content;// Pega a foto anexo

                this.addline(values);//Somente depois de adicionar o arquivo ele cria alinha com os dados

                this.formEl.reset();//Limpar o formulário

                btn.disable = false;//habilitar o botão 
               

            }, 
            (e)=>{
                console.error(e);// console erro já exibe a mensagem como erro.

            });
            
            
        });

        //console.log(this.onSubmit);

    }

    getPhoto(){

        //Promisse é uma recurso(uma classe precisa ser inciada com new) assincrono que no caso de resolve ele segue o fluxo e reject mostra um erro.
        //Sincrono - depende de uma ação
        //Assincrono não depende de nenhuma ação é uma rotina automatica
        return new Promise((resolve, reject)=>{

                  //Quando usamos o comando NEW FILEREADER()" já invoca o método construtor
        let fileReader = new FileReader();

        
        let elements = [...this.formEl.elements].filter (item => {// filter serve para filtrar um elemento do array específico
           
            
            if (item.name === 'photo'){// Se o item for foto eu retorno o item foto
                 return item;
            }

        });

        
        let file = elements[0].files[0];//Objeto file para passar para o fileReader
        
        fileReader.onload = () =>{
          
            resolve(fileReader.result);
        };

        fileReader.onerror = (e)=>{//FileReader função para quando ocorrer erro

            reject(e);

        }
        if(file){// colocado o If para que caso não coloque o arquivo ele não dê o erro

        fileReader.readAsDataURL(file);
    
    }else{
        resolve('dist/img/boxed-bg.jpg');// Colocado uma imagem padrão caso o usuário não anexe a imagem. Imagem salva na pasta do projeto.
    }
}

        )};

  
    

    getValues() {// Método captura os dados do usuário

        let user = {};//Variável que armazena o Json
        let isValid = true;

        // SPREAD - tentamos buscar um elemento "array" porém de HTML, o spread é usado para descrever quantos 
        //índices o array possuí, mesmo sendo de HTML. Comando: [...] como mostra abaixo. 
       
        [...this.formEl.elements].forEach(function (field, index) {

            if(['name','email','password'].indexOf(field.name)> -1 && !field.value){

                field.parentElement.classList.add('has-error');//Exibe os dados do objeto em forma de árvore com subniveis no console
                isValid = false;
            }

            if (field.name == "gender") {

                if (field.checked) {
                    user[field.name] = field.value;

                }
            } else if(field.name == "admin"){

                user[field.name] = field.checked;

            }else {

                user[field.name] = field.value;
            }


        });
        if(!isValid){
            return false;

        }

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

        let tr = document.createElement('tr');

         //DataSet faz parte da API Web Permite leitura e escrita em elementos com Data-.
        tr.dataset.user = JSON.stringify(dataUser);//Serialização tranforma um objeto em texto
        

        //Usado Template string, usando novo modelo de ${} ao invés de concatenar com +

        tr.innerHTML = `
            <td><img src=${dataUser.photo} alt="User Image" class="img-circle img-sm"></td>
            <td>${dataUser.name}</td> 
            <td>${dataUser.email}</td>
            <td>${(dataUser.admin) ? 'Sim' : 'Não'} </td>
            <td>${Utils.dateFormat(dataUser.register)}</td>
            <td>
                <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
      
        `;

            tr.querySelector(".btn-edit").addEventListener("click", e=>{

                console.log(JSON.parse(tr.dataset.user));//Json.parse - Interpret uma string

                this.showPanelUpdate();
               
            });
        
        this.tableEl.appendChild(tr); //appendchild permite adicionar código HTML como elemento filho do elemento atual
        
        this.updateCount();

    }

    showPanelCreate(){

        document.querySelector("#box-user-create").style.display ="block";
        document.querySelector("#box-user-update").style.display ="none";


    };

    showPanelUpdate(){

        document.querySelector("#box-user-create").style.display ="none";
        document.querySelector("#box-user-update").style.display ="block";

    };
    updateCount(){//Atualiza o painel com a quantidade de usuários no painel

        let numberUsers = 0;
        let numberAdmin = 0;

        [...this.tableEl.children].forEach(tr=>{

            numberUsers++;//adiciona um usuário

            let user = JSON.parse(tr.dataset.user);

            if(user._admin) numberAdmin++;//Se for Admin mudar no painel

            //console.log(JSON.parse(tr.dataset.user));//Validar se virou um Json

        });

        document.querySelector("#number-users").innerHTML = numberUsers;
        document.querySelector("#number-users-admin").innerHTML = numberAdmin;

    }
    
}
