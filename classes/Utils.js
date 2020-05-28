class Utils {

    static dateFormat(date){//Método estático chamado diretamente pelo nome da classe

        return date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()+' '
        +date.getHours()+':'+date.getMinutes();
    }
    
}