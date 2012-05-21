var managerViewModel = null;

$().ready(function () {
  $("#btnSalvar").click(salvar);
  managerViewModel = new ManagerViewModel('a\nb\nc\n///r\n# a.sub("x")\na\n/\nx\n///r\n# b.sub("x")\nb\n/\nx\n///r\n# c.sub("x")\nc\n/\nx\n///x\nxxx-1, xxx0, xxx1, xxx2\n');
  ko.applyBindings(managerViewModel);
  exibirEditor(managerViewModel.sessaoEscolhidaTexto());
});

var editor = null;
function exibirEditor(data) {
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

  editor.getSession().setValue(data)
}

function ManagerViewModel(texto) {
  // Data
  var self = this;
  self.sessoes = ['Edit', 'Sequence', 'View', 'Result', 'Transform', 'Debug'];
  self.sessaoEscolhidaId = ko.observable();
  self.sessaoEscolhidaTexto = ko.observable(texto);

  // Behaviours
  self.irParaSessao = function (sessao) {
    location.hash = sessao;
  };

  self.transformar = function(){
    var resultado = executarRobo($("#textAreaDados").val());
    $("#textAreaDados").val(resultado);
  }

  Sammy(function() {
    this.get('#:sessao', function() {
      self.sessaoEscolhidaId(this.params.sessao);

      switch (this.params.sessao) {
        case "Edit":
          exibirEditor(self.sessaoEscolhidaTexto())

          break;

        case "View":
          var replace_show_invisible = function (texto) {
            texto = texto.replace(/(<)(%.*?%)(>)/gm, "$1<span class='template'>$2</span>$3");
            texto = texto.replace(/^(\/\/\/\w)$/gm, "<span class='comando'>$1</span>");
            texto = texto.replace(/^\/$/gm, "<span class='char_replacer_separator'>/</span>");
            texto = texto.replace(/$/gm, "<span class='char_n'>\\n</span>");
            texto = texto.replace(/\t/gm, "<span class='char_tab'>\\t</span>");
            texto = texto.replace(/^(#.*)$/gm, "<span class='comentario'>$1</span>");
            return texto;
          };

          var transformado = replace_show_invisible(self.sessaoEscolhidaTexto());

          $("#preEscripte").html(transformado);

          break;

        case "Result":
          var roboXixi = new RoboXixi(self.sessaoEscolhidaTexto(), '\n');
          roboXixi.transformar();
          $("#preEscripteResultado").html(roboXixi.ResultadoFinal);

          break;

        case "Transform":
          var roboXixi = new RoboXixi(self.sessaoEscolhidaTexto(), '\n');
          $("#textAreaDados").val(roboXixi.DadosIniciais);

          break;
      }
    });
  }).run();

  var executarRobo = function (texto) {
    // executa transformação
    var roboXixi = new RoboXixi(self.sessaoEscolhidaTexto(), '\n');
    if (!_.isUndefined(texto)) {
      roboXixi.DadosIniciais = texto;
    }
    roboXixi.transformar();

    // Executa toda transformação
    return roboXixi.ResultadoFinal;
  };

  //self.irParaSessao('View');

};


//////////////////////////////////////////////////////////
// KEY-BINDS:
//////////////////////////////////////////////////////////
window.onkeydown = function (evt) {
  evt = evt || window.event;
  // Ctrl + S -> salvar
  if (evt.ctrlKey && evt.keyCode === "S".charCodeAt(0)) {
    salvar();
    return false; // Prevent any default browser behaviour
  }
};

var salvar = function () {
  var dados = {
    Nome: $("#Nome").val(),
    Descricao: $("#Descricao").val(),
    Texto: editor.getSession().getValue()
  };

  var request = $.ajax({
    type: "POST",
    data: dados
  });

  request.done(function (data) {
    if (data === "salvo") {
      exibirMensagemUi(
        "Sucesso",
        "Os dados foram salvos com sucesso. Mensagem retornada: [" + data + "]",
        1000
      );
    }
    if (data === "criado") {
      window.location.href = "../Escriptes";
    }
  });

  request.fail(function (jqXHR, textStatus) {
    exibirMensagemUi("Request failed", textStatus);
  });
};

window.onkeydown = function (evt) {
  evt = evt || window.event;
  // CTRL + ENTER
  if (evt.ctrlKey && evt.keyCode === 13) {
    managerViewModel.transformar();
  }
};