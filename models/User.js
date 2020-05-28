class User {

    constructor(name, gender, birth, country, email, password, photo, admin) {
        // colocar um _ (conhecidos como modificadores de acesso ou encapsulamento) antes do nome da variável demonstra que 
        // ela é propriedade privada e só pode ser acessada por métodos getters e setters.
        this._name = name;
        this._gender = gender;
        this._birth = birth;
        this._country = country;
        this._email = email;
        this._password = password;
        this._photo = photo;
        this._admin = admin;
        this._register = new Date(); // Cria uma nova data quando faz o registro

    }
    get register(){

        return this._register;
    }

    get name(){

        return this._name;
    }
    get gender(){

        return this._gender;
    }
    get birth(){

        return this._birth;
    }
    get country(){

        return this._country;
    }
    get email(){

        return this._email;
    }
    get password(){

        return this._password;
    }
    get photo(){

        return this._photo;
    }
    get admin(){

        return this._admin;
    }
    set photo(value){//O Set é para pegar um valor, por isso o parametro com "VALOR". Ex:. no caso de querer criptografar uma senha
    // as condições seriam colocadas no SET.

        this._photo = value;
    }

}