const axios = require("axios");

async function get_token(){
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }

    return axios
        .post("https://tecweb-js.insper-comp.com.br/token", { username: "luizatac" }, config)
        .then((response) => response.data.accessToken);
}


async function get_exercises(token){
    const config2 = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }
    return axios
        .get("https://tecweb-js.insper-comp.com.br/exercicio", config2)
        .then((response) => response)
    }

async function submit_solution(token, exerciseSlug, answer) {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        }
    };
    return axios
        .post(`https://tecweb-js.insper-comp.com.br/exercicio/${exerciseSlug}`,  { "resposta": answer }, config)
        .then((response) => {
            console.log(`Resposta para o exercício ${exerciseSlug}: ${response.data.sucesso ? 'Correta' : 'Incorreta'}`);
            return response.data.success;
        })
        .catch((error) => {
            console.error("Erro ao enviar resposta:", error.message);
            return false;
        });
}

async function solve_and_submit_exercises(token, exercicios) {
  for (const exerciseSlug in exercicios) {
      const exercicio = exercicios[exerciseSlug];

      console.log(`--------------------------------------------------------------\n`);
      console.log(`Exercício: ${exerciseSlug}`);
      console.log("Valores de entrada:", exercicio.entrada);
      
      let answer = null;

      //1
      if(exercicio.titulo === "Soma valores"){
        answer = exercicio.entrada.a + exercicio.entrada.b; 

      }
      //2
      else if(exercicio.titulo === "Tamanho da string"){
        answer = exercicio.entrada.string.length; 
      }
      //3
      else if(exercicio.titulo === "Nome do usuário"){
        entrada = exercicio.entrada.email;
        answer = entrada.substring(0, entrada.indexOf('@')); 
      }
      //4
      else if(exercicio.titulo === "Jaca Wars!"){
        vel = exercicio.entrada.v;
        g = 9.8;
        theta = exercicio.entrada.theta;
        d = vel**2 * Math.sin((Math.PI / 180) * theta *2) / g;
        dist = d - 100
        if (dist >=-2 && dist <=2){  
          answer = 0
        }

        else if(dist > 2){
          answer = 1
        }
        else{
          answer = -1
        }

       
      }
      //5
      else if (exercicio.titulo === "Ano bissexto"){
        ano = exercicio.entrada.ano;
        if (ano % 100 !== 0 && ano % 4 === 0 || ano % 400 === 0){
          answer = true
        }
        else{
          answer = false
        }
      }
      //6
      else if (exercicio.titulo === "Volume da PIZZA!"){
        raio = exercicio.entrada.z;
        altura = exercicio.entrada.a;
        area_base = Math.PI * raio**2;
        volume = area_base * altura;
        answer = Math.round(volume);

      }
      //7
      else if (exercicio.titulo === "Movimento retilíneo uniforme"){
        s0 = exercicio.entrada.s0;
        vel = exercicio.entrada.v;
        t = exercicio.entrada.t;
        answer = s0 + vel*t;
      }
      //8
      else if (exercicio.titulo === "Inverta a string"){
        entrada = exercicio.entrada.string;
        answer = entrada.split("").reverse().join("");

      }
      //9
      else if (exercicio.titulo === "Soma os valores guardados no objeto"){
        entrada = exercicio.entrada.objeto;
        for (let i in entrada){
          answer += entrada[i];
        }
      }
      //10
      else if (exercicio.titulo === "Encontra o n-ésimo número primo"){
        n = exercicio.entrada.n;
        let count = 0;
        let num = 2;
        while (count < n){
          let prime = true;
          for (let i = 2; i <= Math.sqrt(num); i++){
            if (num % i === 0){
              prime = false;
              break;
            }
          }
          if (prime){
            count++;
          }
          num++;
        }
        answer = num - 1;
      }
      //11
      else if (exercicio.titulo === "Maior prefixo comum"){
        let resp_parc = "";
        let lista = exercicio.entrada.strings; 
        let resposta = "";
        if (lista.length %2 ===0){
          for (let i = 0; i < lista.length; i = i + 2){
            let palavra = lista[i]; 
            let palavra2 = lista[i + 1];
            for(let j = 0; j < palavra.length; j++){
                if(palavra[j] !== palavra2[j]){
                    break;
                }
                resp_parc += palavra[j];
            }
            if (resp_parc.length > resposta.length){
                resposta = resp_parc;
            }

            resp_parc = "";
        }
        answer = resposta;

        }
        else{
          for (let i = 0; i < lista.length - 1; i = i + 2){
            let palavra = lista[i]; 
            let palavra2 = lista[i + 1];
            for(let j = 0; j < palavra.length; j++){
                if(palavra[j] !== palavra2[j]){
                    break;
                }
                resp_parc += palavra[j];
            }
            if (resp_parc.length > resposta.length){
                resposta = resp_parc;
            }

            resp_parc = "";
        }
        answer = resposta;

        }
        
    }
    //12
    else if (exercicio.titulo === "Soma do segundo maior e menor números"){
      let lista = exercicio.entrada.numeros;
      let maior = -Infinity;
      let menor = Infinity;
      let segundo_maior = -Infinity;
      let segundo_menor = Infinity;

      for (let i = 0; i < lista.length; i++){
          if (lista[i] > maior){
              segundo_maior = maior;
              maior = lista[i];
          }
          else if (lista[i] > segundo_maior){
              segundo_maior = lista[i];
          }
          if (lista[i] < menor){
              segundo_menor = menor;
              menor = lista[i];
          }
          else if (lista[i] < segundo_menor){
              segundo_menor = lista[i];
          }
      }
      answer = segundo_maior + segundo_menor;
    }
    //13
    else if (exercicio.titulo === "Conta palíndromos"){
      let lista = exercicio.entrada.palavras;
      let count = 0;
      for (let i = 0; i < lista.length; i++){
          let palavra = lista[i];
          if (palavra === palavra.split("").reverse().join("")){
              count++;
          }
      }
      answer = count;
    }
    //14
    else if (exercicio.titulo === "Soma de strings de ints"){
      let lista= exercicio.entrada.strings;
      let soma = 0;
      for (let i = 0; i < lista.length; i++){
          soma += parseInt(lista[i]);
      }
      answer = soma.toString();

    }
    //15
    else if (exercicio.titulo === "Soma com requisições"){
      let lista= exercicio.entrada.endpoints;
      let sum = 0;
      const config2 = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization":`Bearer ${token}`
        }
    }
    
      for (let i = 0; i < lista.length; i++){
        let num = await axios
        .get(`${lista[i]}`, config2)
        .then((response) => response.data)
        
        sum += num;
      }

      answer = sum;
    }
    //16
    else if(exercicio.titulo === "Caça ao tesouro"){
      let i = 0
      let dicionario = exercicio.entrada;
      const config2 = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }
    let response = null;
    while (true){
      if(i === 0){    
      response = await axios.get(dicionario["inicio"], config2);
      }
      console.log(response.data);
      if (typeof response.data === "number"){
        answer = response.data;
        break
        
      }
      else{
        i++;
        response = await axios.get(response.data, config2);
        
    }
  }
  }
     
      console.log("Resposta calculada:", answer);
      await submit_solution(token, exerciseSlug, answer);
  }
}


async function main(){
    try {
        let token = await get_token();
        let exercicios = await get_exercises(token);
        if (exercicios && exercicios.data) {
            console.log("Exercícios recebidos:");
            console.log(exercicios.data);

            await solve_and_submit_exercises(token, exercicios.data);
        } else {
            console.error("Não foi possível obter a lista de exercícios.");
        }
    } catch (error) {
        console.error("Erro:", error.message);
    }
}

main();




