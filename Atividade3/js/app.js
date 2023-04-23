window.addEventListener("DOMContentLoaded", (event) => {

    const baseUrl = "https://parallelum.com.br/fipe/api/v1/"
    const endpointMarcas = `${baseUrl}carros/marcas`
    const marcasList = document.querySelector("#vehicles_brand")
    const modeloList = document.querySelector("#vehicles_model")
    const anosList = document.querySelector("#vehicles_year")
    const searchButton = document.querySelector('#search_button')
    const modal = document.querySelector('#modal')
    const fechar = document.querySelector('#fechar')
    const price = document.querySelector('#price')
    const moto = document.querySelector('#motoImagem')
    const caminhao = document.querySelector('#caminhaoImagem')
    const carro = document.querySelector('#carroImagem')
    const controladorVeiculos = document.querySelector('#vehicles_types')
    
    controladorVeiculos.addEventListener("click",(event) => {
        let botaoVeiculo = event.target;
        let tipoVeiculo = botaoVeiculo.dataset.type;
        
        marcasList.innerHTML = "";
        modeloList.innerHTML = "";
        anosList.innerHTML = "";


        if(!tipoVeiculo){
            return;
        }
        caminhao.classList.remove('active')
        carro.classList.remove('active')
        moto.classList.remove('active')
        marcasList.disabled = false;
        modeloList.disabled = true;
        anosList.disabled = true;
        botaoVeiculo.classList.add('active')


        fetch(`${baseUrl}${tipoVeiculo}/marcas`)
        .then((res)=>{
            
            return res.json()
            
        }).then((data)=> {

            let defaultOption = document.createElement("option")
            defaultOption.innerHTML = '- - -';
            marcasList.appendChild(defaultOption)

            data.map((marca)=>{
                
                let listItem = document.createElement("option")
                listItem.innerText = marca.nome
                listItem.value = marca.codigo
                marcasList.appendChild(listItem)
        
            })
        })

    })
    
    marcasList.addEventListener("change", function () {

        modeloList.innerHTML = "";
        anosList.innerHTML = "";
        searchButton.classList.add('hide')
        modeloList.disabled = true;
        anosList.disabled = true;
        if(!marcasList.value){
            return
        }

        let defaultOption = document.createElement("option")
        defaultOption.innerHTML = '- - -';
        
        modeloList.disabled = false;

        tipoVeiculo = document.querySelector(".botaoVeiculo.active").dataset.type
        fetch(`${baseUrl}${tipoVeiculo}/marcas/${this.value}/modelos`)
            .then((resp) => {

                return resp.json()

            }).then((data) => {

                let defaultOption = document.createElement("option")
                defaultOption.innerHTML = '- - -';
                modeloList.appendChild(defaultOption)

                data.modelos.map((modelo)=>{

                    let listItem = document.createElement("option")
                    listItem.innerText = modelo.nome
                    listItem.value = modelo.codigo
                    modeloList.appendChild(listItem)

                })

            })

    })

    modeloList.addEventListener("change", () => {

        anosList.innerHTML = "";
        searchButton.classList.add('hide')
        anosList.disabled = true;
        if(!modeloList.value){
            return
        }
        anosList.disabled = false;

        let defaultOption = document.createElement("option");
        anosList.defaultOption.innerHTML = '- - -'

        tipoVeiculo = document.querySelector(".botaoVeiculo.active").dataset.type
        fetch(`${baseUrl}${tipoVeiculo}/marcas/${marcasList.value}/modelos/${modeloList.value}/anos`)
            .then((resp) => {
                return resp.json()
            }).then((data) => {

                anosList.appendChild(document.createElement("option"))

                data.map((anos)=>{
                    let listItem = document.createElement("option")
                    listItem.innerText = anos.nome
                    listItem.value = anos.codigo
                    anosList.appendChild(listItem)
                })

            })
    })    
    anosList.addEventListener("change", () =>{

        if(!anosList.value){
            searchButton.classList.add('hide')
        }else{
            searchButton.classList.remove('hide')
        }
        

    })

    searchButton.addEventListener("click", () =>{

        if(!anosList.value){
            return;
        }

        modal.classList.remove('hide_modal')

        tipoVeiculo = document.querySelector(".botaoVeiculo.active").dataset.type


        fetch(`${baseUrl}${tipoVeiculo}/marcas/${marcasList.value}/modelos/${modeloList.value}/anos/${anosList.value}`)
        .then((resp) => {
            return resp.json()
        }).then((data) => {
            price.innerHTML = data.Valor
            document.getElementById('valueMesReferencia').innerHTML = data.MesReferencia
            document.getElementById('valueFipe').innerHTML = data.CodigoFipe
            document.getElementById('valueAno').innerHTML = data.AnoModelo
            document.getElementById('valueMarca').innerHTML = data.Marca
        })
        var value = anosList.options[anosList.selectedIndex].value
        var text = anosList.options[anosList.selectedIndex].text
    })

    fechar.addEventListener("click", () =>{

        if(!anosList.innerHTML){
            return;
        }
        modal.classList.add('hide_modal')
    })
});