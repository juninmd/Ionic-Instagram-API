module.exports = {
    functionPadLeft: (numero, l, c) => {
        if (numero.length == l)
            return numero;

        var objeto = Array(l - numero.length + 1).join(c || " ") + numero;

        if (objeto.length > l) {
            var qtd = objeto.length - l;
            var sub = objeto.substring(qtd, objeto.length);
            return sub;
        }
        return objeto;
    }
}