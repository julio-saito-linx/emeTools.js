var managerViewModel = null;
var editor = null;

$().ready(function () {
    managerViewModel = new ManagerViewModel();
    ko.applyBindings(managerViewModel);
});

var Exemplo = function (obj) {
    var self = this;
    self.nome = obj.nome;
    self.texto = obj.texto;
}

function ManagerViewModel() {
    // Data
    var self = this;
    self.sessoes = ['Edit', 'Sequence', 'View', 'Result', 'Transform', 'ko-data'];
    self.sessaoSelecionadaId = ko.observable();

    self.formatData = function (data) {
        var json = ko.toJS(data);
        return JSON.stringify(json, null, 2);
    }

    self.exemplos = ko.observableArray([]);
    self.exemplos().push(
        new Exemplo(
            {
                nome:"simple ABC to XXX",
                texto:'a\nb\nc\n///r\n# a.sub("x")\na\n/\nx\n///r\n# b.sub("x")\nb\n/\nx\n///r\n# c.sub("x")\nc\n/\nx\n///x\nxxx-1, xxx0, xxx1, xxx2\n'
            }
        ));
    self.exemplos().push(
        new Exemplo(
            {
                nome:"minify css",
                texto:'body\n{\n    font-size: 1.0em;\n    font-family: "Trebuchet MS" , Verdana, Helvetica, Sans-Serif;\n    color: #232323;\n    background-color: #fff;\n    margin: 20px;\n}\n\n/* Custom\n-----------------------------------------------------------*/\n.menuTodo\n{\n    width: 910px;\n    margin: 0px 0px 0px 0px;\n    display: inline-block;\n    border: 3px solid #DDD;\n    background-color: #efefef;\n}\n///r\n[a-zA-Z]+#\n/\n#\n///r\n[\\r\\n]+\\s*\n/\n\n///r\n\\s+\n/\n \n///r\n\\s?([:,;{}])\\s?\n/\n$1\n///r\n;}\n/\n}\n///r\n([\\s:]0)(px|pt|%|em)\n/\n$1\n///r\n/\\*[\\d\\D]*?\\*/\n/\n\n'
            }
        ));
    self.exemplos().push(
        new Exemplo(
            {
                nome:"C# constructor mocker",
                texto:"        public FaturamentoVendaServico(IVendaRepositorio vendaRepositorioSQL,\n                                       IFaturamentoVendaRepositorioSap faturamentoVendaRepositorioSap,\n                                       IFaturamentoVendaRepositorioSql faturamentoVendaRepositorioSql,\n                                       IParametroRepositorio parametroRepositorio,\n                                       IVeiculoRepositorio veiculoRepositorioSQL,\n                                       IClienteRepositorioSap clienteRepositorioSAP,\n                                       IFuncionarioRepositorio funcionarioRepositorioSQL,\n                                       IParametroOperacaoFaturamentoRepositorio parametroOperacaoFaturamentoRepositorioSQL,\n                                       INotaFiscalServico notaFiscalServico,\n                                       IFollowUpVendaServico followUpVendaServico,\n                                       INotaFiscalRepositorio notaFiscalRepositorio,\n                                       INotaFiscalMercantilEletronicaRepositorioSql notaFiscalEletronicaRepositorio,\n                                       IItemNotaFiscalRepositorio itemNotaFiscalRepositorio,\n                                       IFaturamentoRepositorioArquivo faturamentoRepositorioArquivo,\n                                       IConcessionariaRepositorio concessionariaRepositorio,\n                                       ISolicitacaoNotaFiscalServico solicitacaoNotaFiscalServico,\n                                       Oficina.Servicos.IFaturamentoServico faturamentoServico,\n                                       IFollowUpNotaFiscalServico followUpNotaFiscalServico)\n\n///r\n#[[primeira separação]]\n\\b(I\\w+?)\\b\n/\n\\n\\1\n///s\n/^I[a-zA-Z_]/p\n///r\n^(I\\w+?)\\s.*\n/\n\\1\n///c\n# [[interfaces]]\ntrim\ntrim lines\n///c\nget(primeira separação)\n///r\n.*?\\b(\\w+?)[,)].*?\n/\n-->\\1\n///s\n/-->.\\+/p\n///c\ntrim\ntrim lines\n///r\n#[[parametros]]\n^-->\n/\n\n///x\n#[[declaração]]\nprivate Mock<xxx3> _xxx8Mock;\n///x\n#[[inicialização]]\n_xxx8Mock = new Mock<xxx3>();\n///x\n#[[parametros chamada construtor]]\nxxx8: _xxx8Mock.Object,\n///c\nget(-1)\n///r\n(public \\w+)\n/\n\\n-->\\1\\n\n///s\n/-->.\\+/p\n///c\ntrim\ntrim lines\n///r\n#[[classe]]\n^-->public\\s+\n/\n\n///c\n#[[classe minúsculo]]\nfirstToLower\n///x\n#[[declaração da classe]]\nprivate xxx16 _xxx17;\n///x\n#[[inicialização da classe]]\n_xxx17 = new xxx16(\n///t\n#[[Resultado Final]]\n//a classe\n<%= get('declaração da classe')%>\n//e suas dependências\n<%= get('declaração')%>\n\n\n//inicializa as dependências mockadas\n<%= get('inicialização')%>\n\n//inicializa a classe\n<%= get('inicialização da classe')%>\n# tira a última vírgula\n<%= get('parametros chamada construtor').substring(0, get('parametros chamada construtor').length - 1) %>);\n"
            }
        ));
    self.exemplos().push(
        new Exemplo(
            {
                nome:"table to mysql insert creator",
                texto:"Chico Pizzas - 3437-7272\n\nClique no sabor ou na foto para ampliá-la\n\nVoltar a Página Principal                       \n\t\n\nSabores\n\t\t\t\n\nBroto\n\tMédia \tGrande \tJumbo\n\t\n\n\t\t\n\n4  fatias\n\t\n\n6  fatias\n\t\n\n8  fatias\n\t\n\n10 fatias\n1 \tCamarão \t\n\n\tEntrega \t41,80 \t55,00 \t63,25 \t71,50\n\tMolho de Tomate, Mussarela, Camarão, Tomate, Orégano, Azeitona \t\tBalcão \t38,00 \t50,00 \t57,50 \t65,00\n2 \tQuatro queijos \t\n\n\tEntrega \t29,70 \t41,25 \t47,85 \t54,45\n\tMolho de Tomate, Mussarela, Parmesão, Provolone, Catupiri, Orégano, Azeitona \t\tBalcão \t27,00 \t37,50 \t43,50 \t49,50\n3 \tAtum \t\n\n\tEntrega \t29,70 \t41,25 \t37,85 \t54,45\n\tMolho de Tomate, Mussarela, Atum, Cebola, Orégano, Azeitona \t\tBalcão \t27,00 \t37,50 \t43,50 \t49,50\n4 \tCalabresa \t\n\n\tEntrega \t29,70 \t41,25 \t27,85 \t54,45\n\tMolho de Tomate, Mussarela, Calabresa, Cebola, Orégano, Azeitona \t\tBalcão \t27,00 \t37,50 \t43,50 \t49,50\n5 \tMussarela \t\n\n\tEntrega \t29,70 \t41,25 \t48,85 \t54,45\n\tMolho de Tomate, Mussarela, Tomate, Orégano, Azeitona \t\tBalcão \t27,00 \t37,50 \t43,50 \t49,50\n6 \tPortuguesa \t\n\n\tEntrega \t29,70 \t41,25 \t57,85 \t54,45\n\tMolho de Tomate, Mussarela, Presunto, Cebola, Orégano, Azeitona, Ovo Cozido \t\tBalcão \t27,00 \t37,50 \t43,50 \t49,50\n7 \tPaulista \t\n\n\tEntrega \t29,70 \t41,25 \t47,85 \t54,45\n\tMolho de Tomate, Mussarela, Palmito, Presunto, Orégano, Azeitona \t\tBalcão \t27,00 \t37,50 \t43,50 \t49,50\n9 \tNapolitana \t\n\n\tEntrega \t29,70 \t41,25 \t35,85 \t54,45\n\tMolho de Tomate, Mussarela, Presunto, Orégano, Azeitona \t\tBalcão \t27,00 \t37,50 \t43,50 \t49,50\n10 \tLombinho \t\n\n\tEntrega \t29,70 \t41,25 \t47,85 \t54,45\n\tMolho de Tomate, Mussarela, Lombinho Defumado, Parmesão, Orégano, Azeitona \t\tBalcão \t27,00 \t37,50 \t43,50 \t49,50\n11 \tFrango \t\n\n\tEntrega \t29,70 \t41,25 \t35,85 \t54,45\n\tMolho de Tomate, Mussarela, Frango Desfiado, Catupiri, Orégano, Azeitona \t\tBalcão \t27,00 \t37,50 \t43,50 \t49,50\n12 \tCatuperú \t\n\n\tEntrega \t29,70 \t41,25 \t47,35 \t54,45\n\tMolho de Tomate, Mussarela, Peito de Perú Defumado, Catupiri, Orégano, Azeitona \t\tBalcão \t27,00 \t37,50 \t43,50 \t49,50\n13 \tCalifórnia \t\n\n\tEntrega \t29,70 \t41,25 \t38,85 \t54,45\n\tMolho de Tomate, Mussarela, Figo, Abacaxi, Pêssego, Cereja \t\tBalcão \t27,00 \t37,50 \t43,50 \t49,50\n14 \tBrócolis \t\n\n\tEntrega \t29,70 \t41,25 \t39,85 \t54,45\n\tMolho de Tomate, Mussarela, Brócolis, Catupiri, Orégano, Azeitona \t\tBalcão \t27,00 \t37,50 \t43,50 \t49,50\n15 \tMarguerita \t\n\n\tEntrega \t29,70 \t41,25 \t38,85 \t54,45\n\tMolho de Tomate, Mussarela, Manjericão, Tomate, Orégano, Azeitona \t\tBalcão \t27,00 \t37,50 \t43,50 \t49,50\n16 \tHumita \t\n\n\tEntrega \t29,70 \t41,25 \t39,85 \t54,45\n\tMolho de Tomate, Mussarela, Milho, Orégano, Azeitona \t\tBalcão \t27,00 \t37,50 \t43,50 \t49,50\n17 \tAlho e óleo \t\n\n\tEntrega \t29,70 \t41,25 \t41,85 \t54,45\n\tMolho de Tomate, Mussarela, Alho Frito, Orégano, Azeitona \t\tBalcão \t27,00 \t37,50 \t43,50 \t49,50\n18 \tMista \t\n\n\tEntrega \t29,70 \t41,25 \t41,85 \t54,45\n\tMolho de Tomate, Mussarela, Presunto, Frango Desfiado, Orégano, Azeitona \t\tBalcão \t27,00 \t37,50 \t43,50 \t49,50\n19 \tMadre \t\n\n\tEntrega \t29,70 \t41,25 \t42,85 \t54,45\n\tMolho de Tomate, Mussarela, Bacon, Palmito, Azeitona, Orégano \t\tBalcão \t27,00 \t37,50 \t43,50 \t49,50\n20 \tVegetal \t\n\n\tEntrega \t29,70 \t41,25 \t42,85 \t54,45\n\tMolho de Tomate, Mussarela, Palmito, Aspargo, Milho, Brócolis, Tomate, Orégano, Azeitona \t\tBalcão \t27,00 \t37,50 \t43,50 \t49,50\n21 \tSanta fé \t\n\n\tEntrega \t29,70 \t41,25 \t43,85 \t54,45\n\tMolho de Tomate, Mussarela, Brócolis, Palmito, Ervilha, Catupiri, Orégano, Azeitona \t\tBalcão \t27,00 \t37,50 \t43,50 \t49,50\n22 \tItaliana \t\n\n\tEntrega \t29,70 \t41,25 \t43,85 \t54,45\n\tMolho de Tomate, Mussarela, Salame Italiano, Orégano, Azeitona \t\tBalcão \t27,00 \t37,50 \t43,50 \t49,50\n24 \tMaracatú \t\n\n\tEntrega \t29,70 \t41,25 \t45,85 \t54,45\n\tMolho de Tomate, Mussarela, Calabresa, Champignon, Orégano, Azeitona \t\tBalcão \t27,00 \t37,50 \t43,50 \t49,50\n25 \tPasqualina \t\n\n\tEntrega \t29,70 \t41,25 \t45,85 \t54,45\n\tMolho de Tomate, Mussarela, Bacon, Provolone, Parmesão, Catupiri, Orégano, Azeitona \t\tBalcão \t27,00 \t37,50 \t43,50 \t49,50\n27 \tDa Casa \t\n\n\tEntrega \t29,70 \t41,25 \t51,85 \t54,45\n\tMolho de Tomate, Mussarela, Presunto, Palmito, Frango, Ervilha, Orégano, Azeitona \t\tBalcão \t27,00 \t37,50 \t43,50 \t49,50\n28 \tPalmito \t\n\n\tEntrega \t29,70 \t41,25 \t51,85 \t54,45\n\tMolho de Tomate, Mussarela, Palmito, Orégano, Azeitona \t\tBalcão \t27,00 \t37,50 \t43,50 \t49,50\n29 \tBanana \t\n\n\tEntrega \t29,70 \t41,25 \t52,85 \t54,45\n\tMussarela, Banana, Leite Condensado, Canela \t\tBalcão \t27,00 \t37,50 \t43,50 \t49,50\n30 \tTomate Seco \t\n\n\tEntrega \t36,85 \t48,40 \t56,10 \t63,25\n\tMolho de Tomate, Mussarela, Tomate Seco, Azeitona, Orégano \t\tBalcão \t33,50 \t44,00 \t51,00 \t57,50\n31 \tChocolate Preto \t\n\n\tEntrega \t29,70 \t41,25 \t53,85 \t54,45\n\tMussarela, Chocolate ao Leite, Leite Condensado, Cereja \t\tBalcão \t27,00 \t37,50 \t43,50 \t49,50\n32 \tBacon \t\n\n\tEntrega \t29,70 \t41,25 \t54,85 \t54,45\n\tMolho de Tomate, Mussarela, Bacon, Tomate, Azeitona, Orégano \t\tBalcão \t27,00 \t37,50 \t43,50 \t49,50\n34 \tChampignon \t\n\n\tEntrega \t29,70 \t41,25 \t32,85 \t54,45\n\tMolho de Tomate, Mussarela, Champignon, Tomate, Azeitona, Orégano \t\tBalcão \t27,00 \t37,50 \t43,50 \t49,50\n35 \tPicante \t\n\n\tEntrega \t29,70 \t41,25 \t25,85 \t54,45\n\tMolho de pimenta da casa, Mussarela, Tomate, Azeitona, Orégano \t\tBalcão \t27,00 \t37,50 \t43,50 \t49,50\n36 \tPeperoni \t\n\n\tEntrega \t36,85 \t48,40 \t56,10 \t63,25\n\tMolho de Tomate, Mussarela, Peperoni, Tomate, Azeitona, Orégano \t\tBalcão \t33,50 \t44,00 \t51,00 \t57,50\n37 \tPeperoni extra \t\n\n\tEntrega \t36,85 \t48,40 \t52,10 \t63,25\n\tMolho de pimenta da casa, Mussarela, Peperoni, Tomate, Azeitona, Orégano \t\tBalcão \t33,50 \t44,00 \t51,00 \t57,50\n38 \tVeronesa \t\n\n\tEntrega \t29,70 \t41,25 \t25,85 \t54,45\n\tMussarela, Goiabada, Catupiri \t\tBalcão \t27,00 \t37,50 \t43,50 \t49,50\n41 \tChocolate branco \t\n\n\tEntrega \t29,70 \t41,25 \t33,85 \t54,45\n\tMussarela, Chocolate branco, Cereja \t\tBalcão \t27,00 \t37,50 \t43,50 \t49,50\n42 \tÁrabe \t\n\n\tEntrega \t29,70 \t41,25 \t37,85 \t54,45\n\tMussarela, Carne de Esfiha, Cebola, Tahine, Tomate, Azeitona, Orégano \t\tBalcão \t27,00 \t37,50 \t43,50 \t49,50\n43 \tStrogonoff \t\n\n\tEntrega \t29,70 \t41,25 \t36,85 \t54,45\n\tMolho de Tomate, Mussarela, Frango Desfiado, Molho de Strogonoff, Champignon, Tomate, Azeitona, Orégano \t\tBalcão \t27,00 \t37,50 \t43,50 \t49,50\n\nEntrega - Produto entregue em sua residência, nos bairros centrais de Criciúma.\n\nBalcão - Produto retirado no balcão da pizzaria na Rua Marcos Rovaris, 578 - Centro - Criciúma SC.\n\nVoltar a Página Principal              \n///r\n# nome das pizza\n^\\d+\\s+([ãáúó'éí\\w ]+)+?\\t$\n/\n\\n\\n==>\\1\\n\\n\n///s\n# filtra\n/\\=\\=\\>/p\n///c\ntrim\ntrim lines\n///r\n# [[pizzas]]\n==>\n/\n\n///c\nget(-1)\n///r\n# ingredientes\n^\\s+([ãáúóê'éí\\w, ]+)\\s+(Balcão)\n/\n\\n==>\\1\\n\n///s\n# filtra\n/\\=\\=\\>/p\n///r\n# [[ingredientes em linha]]\n==>\n/\n\n///r\n([^,]+?)(,|\\s+$)\n/\n\\1\\n\n///c\n# [[ingredientes distinct]]\ntrim lines\ntrim\nsort\ndistinct\n///c\nget(-1)\n///r\n^\\s+Entrega(\\s+([\\d,]+))(\\s+([\\d,]+))(\\s+([\\d,]+))(\\s+([\\d,]+))\n/\n\nbroto ==>\\2\nmédia ==>\\4\ngrande ==>\\6\njumbo ==>\\8\n///s\n# filtra\n/grande \\=\\=\\>/p\n///c\ntrim lines\n///r\n.+?==>(.+)\n/\n\\1\n///r\n# [[preço da grande]]\n\\,\n/\n.\n///x\n#[[insert pizza]]\nINSERT INTO `Pizza` (`Nome`, `Preco`) VALUES ('xxx3', xxx15);\n///x\n#[[insert ingrediente]]\nINSERT INTO `Ingrediente` (`Nome`) VALUES ('xxx9');\n///c\nget('ingredientes em linha')\n///c\n#[[ingredientes em linha 2]]\ntrim lines\ntrim\n///r\n\\n\n/\n\\n----\\n\n///r\n#[[ingredientes multi-line]]\n(,\\s*)\n/\n\\n\n///r\n^([ãáúóê'éí\\w ]+)\n/\nINSERT INTO `Pizza_Ingrediente` (`Pizza_id`, `Ingrediente_id`) VALUES (@lid, (select id from ingrediente where nome = '\\1'));\n///x\n# [[pizzas vs ingredientes]]\nxxx16\nSET @lid := LAST_INSERT_ID();\nxxx22\n\n///t\n<%=get('insert ingrediente')%>\n\n<%=get('pizzas vs ingredientes')%>\n"
            }
        ));

    self.exemploSelecionado = ko.observable(self.exemplos()[0]);
    self.selecionarExemplo = function (exemplo) {
        self.exemploSelecionado(exemplo);
    }

    self.resultadoTransformacao = ko.observable(new RoboXixi(self.exemploSelecionado().texto, '\n').DadosIniciais);

    /*
     *
     * EDIT
     *
     * */
    self.carregarEdit = ko.computed(function () {
        // configura o editor
        editor = ace.edit("editor");

        // tamanho de fonte
        editor.setFontSize('13pt');

        // não transformar tab em espaço
        editor.getSession().setUseSoftTabs(false);

        // tab = 2 espaços
        editor.getSession().setTabSize(2);

        // mostrar invisíveis, TAB, espaca, quebra de linha...
        editor.setShowInvisibles(true);

        // modo ruby por causa dos comentários
        var rubyMode = require("ace/mode/ruby").Mode;
        var rubyInstanciado = new rubyMode();
        rubyInstanciado.$tokenizer.rules.start.splice(10, 1, { token:"comment", regex:"aaa" });
        editor.getSession().setMode(rubyInstanciado);

        editor.show;

        editor.getSession().setValue(self.exemploSelecionado().texto)
    });

    /*
     *
     * SEQUENCE
     *
     * */
    self.robo = ko.observable();
    self.robo.passos = ko.observableArray([]);
    self.robo.xixizeroSelecionado = ko.observable();
    self.selecionarEscripte = function (xixizero) {
        self.robo.xixizeroSelecionado(xixizero);
    };
    self.carregarSequence = ko.computed(function () {
        var roboXixi = new RoboXixi(self.exemploSelecionado().texto, '\n');
        roboXixi.transformar();
        self.robo.passos.removeAll();

        _.each(roboXixi.Xixizeros, function (xixi) {
            self.robo.passos.push(xixi)
        });

        self.robo.xixizeroSelecionado(roboXixi.Xixizeros[0]);
    });

    /*
     *
     * VIEW
     *
     * */
    self.carregarVisualizacao = ko.computed(function () {
        var transformado = replace_show_invisible(self.exemploSelecionado().texto);
        return transformado;
    });

    /*
     *
     * RESULT
     *
     * */
    self.carregarResult = ko.computed(function () {
        var roboXixi = new RoboXixi(self.exemploSelecionado().texto, '\n');
        roboXixi.transformar();

        self.resultadoTransformacao(roboXixi.DadosIniciais);

        return roboXixi.ResultadoFinal;
    });

    /*
     *
     * TRANSFORM
     *
     * */

    self.carregarTransform = function () {
        // executa transformação
        var roboXixi = new RoboXixi(self.exemploSelecionado().texto, '\n');
        roboXixi.DadosIniciais = self.resultadoTransformacao();
        roboXixi.transformar();
        self.resultadoTransformacao(roboXixi.ResultadoFinal);
    };

    // Behaviours
    self.irParaSessao = function (sessao) {
        location.hash = sessao;
    };

    self.transformar = ko.computed(function () {
        // executa transformação
        var roboXixi = new RoboXixi(self.exemploSelecionado().texto, '\n');
        roboXixi.transformar();
        return roboXixi.ResultadoFinal;
    });

    Sammy(
        function () {
            this.get('#:sessao', function () {
                self.sessaoSelecionadaId(this.params.sessao);
            });
        }).run();

}
;

/////////////
// KEY-BINDS:
/////////////
window.onkeydown = function (evt) {
    evt = evt || window.event;
    // CTRL + CIMA
    if (evt.ctrlKey && evt.keyCode === 38) {
        var passos = managerViewModel.robo.passos();
        var xixizeroSelecionado = managerViewModel.robo.xixizeroSelecionado();
        var indiceSelecionado = _.indexOf(passos, xixizeroSelecionado);

        if (indiceSelecionado > 0) {
            indiceSelecionado--;
        }
        managerViewModel.robo.xixizeroSelecionado(managerViewModel.robo.passos()[indiceSelecionado]);
        return false;
    }
    // CTRL + BAIXO
    if (evt.ctrlKey && evt.keyCode === 40) {
        var passos = managerViewModel.robo.passos();
        var xixizeroSelecionado = managerViewModel.robo.xixizeroSelecionado();
        var indiceSelecionado = _.indexOf(passos, xixizeroSelecionado);

        if (indiceSelecionado < passos.length - 1) {
            indiceSelecionado++;
        }
        managerViewModel.robo.xixizeroSelecionado(managerViewModel.robo.passos()[indiceSelecionado]);
        return false;
    }
    // CTRL + LEFT
    if (evt.ctrlKey && evt.keyCode === 37) {
        var sessaoSelecionadaId = managerViewModel.sessaoSelecionadaId();
        var indiceSelecionado = _.indexOf(managerViewModel.sessoes, sessaoSelecionadaId);

        if (indiceSelecionado > 0){  //passos.length - 1) {
            indiceSelecionado--;
        }

        managerViewModel.irParaSessao(managerViewModel.sessoes[indiceSelecionado]);
        return false;
    }
    // CTRL + RIGHT
    if (evt.ctrlKey && evt.keyCode === 39) {
        var sessaoSelecionadaId = managerViewModel.sessaoSelecionadaId();
        var indiceSelecionado = _.indexOf(managerViewModel.sessoes, sessaoSelecionadaId);

        if (indiceSelecionado < managerViewModel.sessoes.length - 1) {
            indiceSelecionado++;
        }

        managerViewModel.irParaSessao(managerViewModel.sessoes[indiceSelecionado]);
        return false;
    }
    // CTRL + C
    if (evt.ctrlKey && evt.keyCode === "C".charCodeAt(0)) {
        prepararCopy();
    }

    // CTRL + ENTER
    if (evt.ctrlKey && evt.keyCode === 13) {
        managerViewModel.carregarTransform();
    }
};

var prepararCopy = function () {
    $("#preEscripteCompleto").val(managerViewModel.robo.xixizeroSelecionado().DadoTransformado);
    $("#preEscripteCompleto")[0].focus();
    $("#preEscripteCompleto")[0].select();
};

var replace_show_invisible = function (texto) {
    texto = texto.replace(/(<)(%.*?%)(>)/gm, "$1<span class='template'>$2</span>$3");
    texto = texto.replace(/^(\/\/\/\w)$/gm, "<span class='comando'>$1</span>");
    texto = texto.replace(/^\/$/gm, "<span class='char_replacer_separator'>/</span>");
    texto = texto.replace(/$/gm, "<span class='char_n'>\\n</span>");
    texto = texto.replace(/\t/gm, "<span class='char_tab'>\\t</span>");
    texto = texto.replace(/^(#.*)$/gm, "<span class='comentario'>$1</span>");
    return texto;
};
