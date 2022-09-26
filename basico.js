//Escrita

function pega (quem){ //retorna o objeto único desejado
    return document.getElementById(quem);
}

function escreve (quem, texto, sobre = false){ //(sobr)escreve o texto no lugar desejado
    if (sobre){
        pega(quem).innerText = texto;
    } else {
        pega(quem).innerText += texto;
    }
}

function substitue (quem, texto, sobre = false){ // substitue trecho de código html ou adiciona
    if (sobre){
        pega(quem).innerHTML = texto;
    } else {
        pega(quem).innerHTML += texto;
    }
}

// Calculos

function soma (a, b){
    return (a + b);
}

function subt (a, b){
    return (a - b);
}



//JSON

function parsa (quem){
    return JSON.parse(quem);
}

function texta (quem){
    return JSON.stringify(quem);
}


//desenha tabela e calcula o total
function tabela (quem, titulo){
    let final = '<table id="tab_' + titulo + '">' +
        '<tr><th colspan="2">' + titulo + '</th></tr>';
        '<tr>' +
            '<th id="nom_gas">Item</th>' +
            '<th id="val_gas">Valor</th></tr>' +
        '<tr id="gasto_001"><td>exemplo</td><td>0</td></tr>';
    let valor = 0.00;

    for (i = 0; i < quem.length; i++){
        final += "<tr><td>" + quem[i].nome + "</td><td>" + quem[i].valor + "</td></tr>";
        valor += parseFloat(quem[i].valor);
    }
    
    final += '<tr id="total"><th colspan="2" id="tot_' + titulo + '">' + valor + '</th></tr>';

    return (final + '</table>');
}

function refaz (){ //refaz tabela e recalcula dados
    substitue("d_gastos", tabela(pagos, "Gastos"), true);
    substitue("d_entradas", tabela(recs, "Ganhos"), true);
    escreve("saldo", subt(parseInt(pega("tot_Ganhos").innerText),parseInt(pega("tot_Gastos").innerText)), true);
}

pega("enviar").addEventListener("click", enviar);
        

//envio do front pro backend
function enviando (fluxo, nome, valor){ //
    //escreve("novo_t", "<br>" + a + b + c);
    
    let adiciona = {nome: nome, valor: valor};
    if (fluxo == "in"){
        recs.push(adiciona);
    } else if (fluxo == "out"){
        pagos.push(adiciona);
    } else {
        return;
    }

    refaz();
    pega("res_valores").click();
}


function enviar (event){
    event.preventDefault();

    enviando(
        pega("tipo").value,
        pega("origem").value,
        (pega("valor").value == "")? 0 : pega("valor").value
    );
}