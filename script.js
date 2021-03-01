const showThem = document.getElementById('articleDisplay');
let games = '';
let total = [];
let totalPrice = [];
let watcher = [];
resultFinal = 0;
const cartChoice = function(){
    document.getElementById('articleDisplay').addEventListener("click", (e) => {
    
        let foundWatcher = watcher.includes(e.target.id);
        watcher.push(e.target.id);
        console.log(watcher);
        let found = articles.find((elt) => elt.name === e.target.id);

        if(foundWatcher){
            console.log('Déjà existant !');
            if(found){
                let number = document.getElementsByName(e.target.id)[0].value;
                let theWatcher = e.target.id +'-tr'
                console.log(theWatcher);
                document.getElementById(theWatcher).innerHTML = ` 
                <td scope="row">
                    <div class="card">
                        <div class="card-body">
                          <h5 class="card-title">${found.name}</h5>
                          <p class="card-text smallfont">Description : ${found.desc}</p>
                          <p> <small>Quantité : ${number} x ${found.price} </small> </p>
                        </div>
                      </div>
                </td>
              
              `
            
              totalPrice.forEach(function(elt){
                  let foundByName = totalPrice.find((e) => e.article === found.name);
                  if(foundByName){
                    foundByName.quantity = number
                    foundByName.price = found.price
                  }
                 
                  totalCalculator()
                //   document.getElementById('total').innerHTML =`Total ${elt.price} €`; 
              })
              
            }
        }
        if(!foundWatcher)
        {
            if(found){
                let number = document.getElementsByName(e.target.id)[0].value;
                
                document.getElementById('myCart').innerHTML += ` <tr id="${found.name}-tr">
                <td scope="row">
                    <div class="card">
                        <div class="card-body">
                          <h5 class="card-title">${found.name}</h5>
                          <p class="card-text smallfont">Description : ${found.desc}</p>
                          <p> <small>Quantité : ${number} x ${found.price} </small> </p>
                        </div>
                      </div>
                </td>
              </tr>`
              totalPrice.push({article : found.name, quantity : number, price : found.price })
              
              totalCalculator()
            }
            
        }

    } )
}

articles.forEach(function(elt){
    console.log('Game added');
    games += `<div class="card" id="card" style="width: 18rem;"><h5 class="card-title text-center" id="title">${elt.name}</h5><div id="img">  <img src="${elt.img}" class="card-img-top" alt="..."></div><div class="card-body desc" id="desc"><div class="col-8"><p class="card-text smallfont">${elt.desc}</p><h6>${elt.price} €</h6></div><div class="col-4" id="panier"><a id="${elt.name}" class="btn btn-primary">Add to cart</a><input type="number" name="${elt.name}" id="number" class="input-group" value="1" min="1" max="100"></div></div></div>`
})


 const totalCalculator = function(){
    
    tq =  totalPrice.map(item => item.quantity).reduce((prev, next) => +prev + +next);
    resultFinal = 10 * parseInt(tq);
    document.getElementById('total').innerHTML = `Total : ${resultFinal} €`

 }




showThem.innerHTML = games; 

cartChoice()