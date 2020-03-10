console.log("front-end");
console.log(sessionStorage);
let url;

$(document).ready(function(){
  if (sessionStorage['userName']) {
    console.log('You are logged in');

  } else {
    console.log('Please login');
  }

  $('#heading').click(function(){
    $(this).css('backgrund', 'teal');
  });
  $('#loginForm').hide();
  $('#loginBtn').click(function(){
    $('loginForm').show();
    $()
  })
  $('#adminPage').hide();
  $('#adminBtn').click(function(){
    $('#adminPage').show();
    $('#homePage').hide();
  });
  $('#homeBtn').click(function(){
    $('#adminPage').hide();
    $('#homePage').show();
  });

    $.ajax({
      url:'config.json',
      type:'GET',
      dataType:'json',
      success: function(configData){
        console.log(configData);
        url = `${configData.SERVER_URL}:${configData.SERVER_PORT}`;
        console.log(url);

      },
      error:function(){
        console.log('error: cannot call api');
      }


    });

    $('#viewUserBtn').click(function(){
      $.ajax({
        url : `${url}/allUsers`,
        type : 'GET',
        dataTypes : 'json',
        success: function(usersFromMongo){
          console.log(usersFromMongo);
        },
        error:function(){
          console.log('error: cannot call api');
        }


      });
    });



    $('#viewProducts').click(function(){
      $.ajax({
        url: `${url}/allProductsFromDB`,
        type : 'GET',
        dataTypes : 'json',
        success : function(productsFromMongo){
          console.log(productsFromMongo);
          document.getElementById('productCards').innerHTML = "";

          for(let i=0; i<productsFromMongo.length; i++){
            document.getElementById('productCards').innerHTML +=
            `<div class="col">
            <h3 class=""> ${productFromMongo[i].name}</h3>
            <h4 class="">$${productsFromMongo[i].price}</h4>
            </div>`;
          }

        },
        error:function(){
          console.log('error: cannot call api');
        }


      });
    });

    //updateProduct

    $('#productForm').submit(function(){
      event.preventDefault();
      let productId = $('#productId').val();
      let productName = $('#productName').val();
      let productPrice = $('#productPrice').val();
      let userId = $('#userId').val();

      console.log(productId, productName, productPrice, userId);
      $.ajax({
        url: `${url}/updateProduct/${productId}`,
        type : 'PATCH',
        data : {
          Name : productName,
          price : productPrice,
          userId : userId
          },
        success : function(data){
          console.log(data);
        },
        error:function(){
          console.log('error: cannot call api');
        }

      });

    });


    $('#loginForm').submit(function(){
      event.preventDefault();
      let username = $('#username').val();
      let password = $('#password').val();
      console.log(username,password);
      $.ajax({
        url: `${url}/loginUser`,
        type : 'POST',
        data : {
          username : username,
          password : password
          },
        success : function(loginData){
          console.log(loginData);
          if (loginData === 'user not found. Please register') {
            alert ('Register please');
          } else {
            sessionStorage.setItem('userId',loginData['_id']);
            sessionStorage.setItem('userName',loginData['username']);
            sessionStorage.setItem('userEmail',loginData['email']);
            console.log(sessionStorage);
          }
        },
        error:function(){
          console.log('error: cannot call api');
        }

      });

    });



    //Logout
$('#logoutBtn').click(function(){
  sessionStorage.clear();
  console.log(sessionStorage)
})


  });
