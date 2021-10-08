// # 1- Cometários em cima de cada linha de código explicando(a). (Quando necessário)
// # 2- Marcelo Ferreira Dos Santos 
// # 3- GitHub @marcelocodigos 

//Instaciando uma classe com o nome de 'Peca'
class Peca{
  //inicializando o meu constructor 
  constructor(){
    this.id=0; //Iniciando  o id da peça a partir do '0'

    //Criando um array vazio com o nome de 'arrayPecas'
    this.arrayPecas=[];

    //Iniciando um Edite Id com valor nulo, e toda vez que este valor 
    //for diferente de nullo eu sei que o user está fazendo uma edição;
    this.editId=null;
   }
   

  //Criando o método 'Salvar'
  salvar(){
      //Construindo o objeto  {id,nomePeca,PesoPeca} para salvar depois em arrayPecas
      let peca = this.lerDados();

     //enviando o objeto peca completo para o metodo valida campos 
     if(this.validaCampos(peca)==true){//Se os dados estiverem ok eu posso salvar 
        //Verificando seu meu editId está nullo
        if(this.editId==null){
          //Se for igual a null eu sei que é uma inserção 
          this.adicionar(peca);
        }//se for diferente de null é uma edição.
        else{
          //Se dentro do editId tiver um valor EX Id do dado que quero editar 
          //Significa que eu quero atualizar este ID dentro do EditId
          this.atualizar(this.editId,peca);
        }
      
      
      
     }//Senao não faça nada!
     
     //Listando os dados na tabela com o metodo listaTabela()
     this.listaTabela();

  }

  //Criando o metodo que vai salvar os dados dentro do arrayPeca se os dados estiverem ok no validaCampos
  adicionar(peca){
    //adicionando produtos ao final do arrayPeca
    this.arrayPecas.push(peca)
    
    //Limpa os campos depois de cadastrar um novo produto
    this.cancelar();
  

  }
  //listar dados dentro da tabela 
  listaTabela(){
    
    let tbody = document.querySelector("#tbody"); //Chama o tbody da tabela
    tbody.innerText=''; //Limpa o tbody para não listar os arquivos duplicados
   
    for(let i=0; i<this.arrayPecas.length; i++){

      //criando uma linha <tr> na tabela  dentro do <tbody> cria um <tr>  aqui </tbody> 
      let tr =  tbody.insertRow()   

      //Insere uma coluna para cada dado, id, nomePeca, pesoPeça , e acoes (editar e excluir)
      let td_id = tr.insertCell();
      let td_nomePeca = tr.insertCell();
      let td_pesoPeca = tr.insertCell();
      let td_acoes = tr.insertCell();

      //Insere os dados dentro das tds de acordo com a posição do arraypecas com base na variável {i}
      td_id.innerText       = this.arrayPecas[i].id;
      td_nomePeca.innerText = this.arrayPecas[i].nomePeca;
      td_pesoPeca.innerText = this.arrayPecas[i].pesoPeca;
     

      //Adiciona a classe css .center para alinhar os itens ao centro 
      td_id.classList.add('center');

      //Criando as linhas Ações com o elemento create element
      let imgEdit = document.createElement('img');
      //caminho da imagem no elemento img
      imgEdit.src ='img/editar.svg';
      //Adicionando a imagem de editar dentro do td_ações
      imgEdit.setAttribute("onclick","peca.preparaEdicao("+JSON.stringify(this.arrayPecas[i])+")");
      td_acoes.appendChild(imgEdit);

      //Criando as minhas Ações com o elemento create element
      let imgDel = document.createElement('img');
      //caminho da imagem no elemento img
      imgDel.src ='img/excluir.svg';
      //Atributo para chamar a função deletar ao clicar na imagem del 
      imgDel.setAttribute("onclick","peca.deletar("+this.arrayPecas[i].id+")");

      //Adicionando a imagem de editar dentro do td_ações
      td_acoes.appendChild(imgDel);
    }
    
  }




  //Método que ler os dados digitados nos campos do formulário
  lerDados(){
      // Criando um objeto Peça Vazio
     
      let peca = {};
      //"Recebe o valor do id dentro do constructor"
      //guarda o valor de id dentro de peca.id do objeto peca peca{id:valor, nomePeca:valor,peso:valor}
      peca.id=this.id++; //Soma  1 no id id=d1+1 isso dá 0=0+1 
      //PEga o valor no campo nome do formulário
      //guarda o valor dentro de peca.nomePeca do objeto peça
      peca.nomePeca = document.getElementById("nome").value;
      peca.pesoPeca = document.getElementById("peso").value; 

      //deve retornar o objeto com os dados id,nomePeca,pesoPeca
      return peca; 

  } 
 
  //Função que prepara a edição dos dados do  array 
  preparaEdicao(dados){
      //PEgando o id do EditId
      this.editId = dados.id; //Atribuindo o valor do id que eu pego nos campos 
      //Jogando os dados do Arraypecas para ons inputs
      document.querySelector("#nome").value = dados.nomePeca;
      document.querySelector("#peso").value = dados.pesoPeca;
      document.querySelector("#btn1").innerText = "Editar";
  
   
  }
  //Atulizar recebe os dados do Metodo PRepara Edição
 atualizar(id,peca){
   //Acessando o id do produto que quero editar
   for (let i = 0; i < this.arrayPecas.length; i++) {
      //Verificando seu o id peças é igual ao que eu quero editar
      if(this.arrayPecas[i].id==id){
         if(confirm("Deseja realmente editar ? ")){
          this.arrayPecas[i].nomePeca = peca.nomePeca;
          this.arrayPecas[i].pesoPeca = peca.pesoPeca;
          alert("A edição foi um sucesso !");
          this.cancelar();
         }else
         {
          this.cancelar();
         }
         
      }
     
   }
 } 
  //Função chamada quando o usuário clica no X de Deletar
  deletar(id){
    //Veirifica se o id é o mesmo que eu quero deletar em array pecas
    for(let i=0; i< this.arrayPecas.length; i++){
      if(this.arrayPecas[i].id==id){
        if(confirm("Tem certeza que deseja remover o item ? ")){
          this.arrayPecas.splice(i,1);
          alert("Item foi removido com sucesso !");
          let tbody = document.querySelector("#tbody");
          tbody.deleteRow(i);

          

        }
        
      }
        
    }
    
  }
  //valida campos
  validaCampos(peca){
      if(this.arrayPecas.length<10) //Se tiver 10 vagas pode cadastrar
      {  //true 
        let msg ='';
        if(peca.nomePeca ==''){
          msg += '. Informe o nome da peça \n';
        }
        if(peca.pesoPeca ==''){
          msg += '. Informe o peso da peça \n';
        }
        if(peca.nomePeca.length <=3){
          msg += '. o nome deve ter mais que 3 caracteres \n';
        }
        if(peca.pesoPeca<=100){
          msg += '. O Peso deve ter mais que 100g  \n';
        }

        if(msg!=''){
          alert(msg);
          return false;

        }

        return true;
      }else
      { //Se array pecas tiver mais que 10 não permitir o cadastro
        alert("Limite de 10 peças atingido ! ");
        this.cancelar();
      }
          
  }

  //metodo para cancelar as ações 
  cancelar(){
    peca.nomePeca = document.getElementById("nome").value='';
    peca.pesoPeca = document.getElementById("peso").value=''; 
    document.querySelector("#btn1").innerText = "Cadastrar";
  }

}
//Uma instãncia da classe peça é armazenada na variável peca 
var peca = new Peca();
