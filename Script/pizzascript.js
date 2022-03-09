window.onload = () =>{
  // Слайдер-------------------------------------------------------------------------------------------------------------------------------------
  // Масив изображений
  let $img = $("#slider img"),
  i = 1,
  isSlide = false;

  $(`#slider img:not(:nth-child(1))`).css({left:`${$("#slider").css("width")}`})
  // Прокрутка вперед
  function getNextImg() {
    if (!isSlide) {
      isSlide = true;
      let $width = $("#slider").css("width");
      $(`#slider img:not(:nth-child(${i}))`).css({left:`${$width}`});
      $(`#slider img:nth-child(${i})`).animate({left:`-${$width}`},800);
      if (i === $img.length ) {
        i = 1;
        $(`#slider img:nth-child(1)`).animate({left:"0"},800,()=>{isSlide = false;});
      }
      else {
        $(`#slider img:nth-child(${i+1})`).animate({left:"0"},800,()=>{isSlide = false;});
        i++
      };
    }
  }
  // Прокрутка назад
  function getPrevImg() {
    if (!isSlide) {
      isSlide = true;
      let $width = $("#slider").css("width");
      $(`#slider img:not(:nth-child(${i}))`).css({left:`-${$width}`})
      $(`#slider img:nth-child(${i})`).animate({left:`${$width}`},800);
      if (i === 1 ) {
        i = $img.length;
        $(`#slider img:nth-child(3)`).animate({left:"0"},800,()=>{isSlide = false;});
      }
      else {
        $(`#slider img:nth-child(${i-1})`).animate({left:"0"},800,()=>{isSlide = false;});
        i--
      };
    }
  }
  // Привязка обработчиков событий
  $("#prev").click(getPrevImg);
  $("#next").click(getNextImg);
  // Интервал пролистывания
  setInterval(getNextImg,15000);
  // Конструктор пиццы---------------------------------------------------------------------------------------------------------------------------
  function Pizza(size) {
    try {
      if (!size) {
        throw new PizzaException("MissingData", "no size given")
      };
      if (size.type !== "Size") {
        throw new PizzaException('UncorectedParameters', "invalid size")
      }
      this.size = size;
    } catch (e) {
      console.log(`${e.name}: ${e.message}`);
    }
  };
  // Конструктор параметров
  function Parameters(type,name,price) {
      this.type = type;
      this.name = name;
      this.price = price;
  }

  // Параметры
  Pizza.SIZE_SMALL = new Parameters("Size","Small",50);
  Pizza.SIZE_MIDLE = new Parameters("Size","Midle",80);
  Pizza.SIZE_LARGE = new Parameters("Size","Large",100);
  Pizza.SAUCE_CLASSIC = new Parameters("Sauce","Кетчуп",10);
  Pizza.SAUCE_BBQ = new Parameters("Sauce","BBQ",20);
  Pizza.SAUCE_RIKOTTA = new Parameters("Sauce","Рікотта",15);
  Pizza.TOPPING_MOC1 = new Parameters("Topping","Сир звичайний",20);
  Pizza.TOPPING_MOC2 = new Parameters("Topping","Сир фета",15);
  Pizza.TOPPING_MOC3 = new Parameters("Topping","Моцарелла",15);
  Pizza.TOPPING_TELYA = new Parameters("Topping","Телятина",25);
  Pizza.TOPPING_TOMAT = new Parameters("Topping","Помідори",18);
  Pizza.TOPPING_MUSHRUM = new Parameters("Topping","Гриби",20);

  Pizza.SAUCE_CLASSIC.splashed = false;
  Pizza.SAUCE_BBQ.splashed = false;
  Pizza.SAUCE_RIKOTTA.splashed = false;
  Pizza.TOPPING_MOC1.added = false;
  Pizza.TOPPING_MOC2.added = false;
  Pizza.TOPPING_MOC3.added = false;
  Pizza.TOPPING_TELYA.added = false;
  Pizza.TOPPING_TOMAT.added = false;
  Pizza.TOPPING_MUSHRUM.added =false;

  // Добавления добавки
  Pizza.prototype.addTopping = function (topping){
    try {
      if (!topping) {
        throw new PizzaException("MissingData", "no topping given")
      };
      if (topping.type !== "Topping") {
        throw new PizzaException('UncorectedParameters', "invalid topping")
      };
      if (topping.added === true) {
        throw new PizzaException('DuplicateTopping', `Topping ${topping.name} has been already added`)
      };

      if (topping.name === "Сир звичайний") {
        this.toppingMoc1 = topping;
        topping.added = true
      }
      else if (topping.name === "Сир фета") {
        this.toppingMoc2 = topping;
        topping.added = true
      }
      else if (topping.name === "Моцарелла") {
        this.toppingMoc3 = topping;
        topping.added = true
      }
      else if (topping.name === "Телятина") {
        this.toppingTelya = topping;
        topping.added = true
      }
      else if (topping.name === "Помідори") {
        this.toppingTomat = topping;
        topping.added = true
      }
      else{
        this.toppingMushrum = topping;
        topping.added = true
      };
    } catch (e) {
      console.log(`${e.name}: ${e.message}`)
    }

  };
  // Соуса
  Pizza.prototype.addSauce = function (sauce){
    try {
      if (!sauce) {
        throw new PizzaException("MissingData", "no sauce given")
      };
      if (sauce.type !== "Sauce") {
        throw new PizzaException('UncorectedParameters', "invalid sauce")
      };
      if (sauce.splashed === true) {
        throw new PizzaException('DuplicateSause', `Sauce ${sauce.name} has been already added`)
      };

      if (sauce.name === "Кетчуп") {
        this.sauceClassic = sauce;
        sauce.splashed = true
      }
      else if (sauce.name === "BBQ") {
        this.sauceBbq = sauce;
        sauce.splashed = true
      }
      else{
        this.sauceRikotta = sauce;
        sauce.splashed = true
      };
    } catch (e) {
      console.log(`${e.name}: ${e.message}`)
    }

  };

  // Удаления добавки
  Pizza.prototype.removeTopping = function (topping){
    try {
      if (!topping) {
        throw new PizzaException("MissingData", "no topping given")
      };
      if (topping.type !== "Topping") {
        throw new PizzaException('UncorectedParameters', "invalid topping")
      }
      if (topping.added === false) {
        throw new PizzaException('MissingTopping', `Topping ${topping.name} was not added`)
      }

      if (topping.name === "Сир звичайний") {
        delete this.toppingMoc1;
        topping.added = false
      }
      else if (topping.name === "Сир фета") {
        delete this.toppingMoc2;
        topping.added = false
      }
      else if (topping.name === "Моцарелла") {
        delete this.toppingMoc3;
        topping.added = false
      }
      else if (topping.name === "Телятина") {
        delete this.toppingTelya;
        topping.added = false
      }
      else if (topping.name === "Помідори") {
        delete this.toppingTomat;
        topping.added = false
      }
      else{
        delete this.toppingMushrum;
        topping.added = false
      };
    } catch (e) {
      console.log(`${e.name}: ${e.message}`)
    }
  };
  // Соуса
  Pizza.prototype.removeSauce = function (sauce){
    try {
      if (!sauce) {
        throw new PizzaException("MissingData", "no sauce given")
      };
      if (sauce.type !== "Sauce") {
        throw new PizzaException('UncorectedParameters', "invalid sauce")
      }
      if (sauce.splashed === false) {
        throw new PizzaException('MissingSauce', `Sauce ${sauce.name} was not added`)
      }

      if (sauce.name === "Кетчуп") {
        delete this.sauceClassic;
        sauce.splashed = false
      }
      else if (sauce.name === "BBQ") {
        delete this.sauceBbq;
        sauce.splashed = false
      }
      else{
        delete this.sauceRikotta;
        sauce.splashed = false
      };
    } catch (e) {
      console.log(`${e.name}: ${e.message}`)
    }
  };

  // Получить список добавок
  Pizza.prototype.getToppings = function (){
    let arr = [], i=0;
    for(let prop in this){
      if (this[prop].added === true) {
          arr[i] = this[prop].name;
          i++;
      }
    };
    return arr
  };
  // Соусов
  Pizza.prototype.getSauces = function (){
    let arr = [], i=0;
    for(let prop in this){
      if (this[prop].splashed === true) {
          arr[i] = this[prop].name;
          i++;
      }
    };
    return arr
  };

  // Узнать размер пиццы
  Pizza.prototype.getSize = function (){
    return this.size.name
  };

  // Узнать цену пиццы
  Pizza.prototype.calculatePrice = function (){
    let cost = 0;
    for(let prop in this){
      if (this[prop].price) {
          cost += this[prop].price
      }
    };
    return cost
  };

  Pizza.prototype.changeSize = function(size){
    try {
      if (!size) {
        throw new PizzaException("MissingData", "no size given")
      };
      if (size.type !== "Size") {
        throw new PizzaException('UncorectedParameters', "invalid size")
      }
      this.size = size;
    } catch (e) {
      console.log(`${e.name}: ${e.message}`);
    }
  }
  // Представляет информацию об ошибке в ходе работы с пиццой
  function PizzaException (name,message) {
    this.name = name;
    this.message = message
  }

  // Создаем объект пиццы
  let pizzaObj = new Pizza(Pizza.SIZE_LARGE);
  document.querySelector(".price p").innerHTML = `${pizzaObj.calculatePrice()}грн`;


  // Форма для выбора размера------------------------------------------------------------------------------------------------------------------
  pizza.addEventListener("click", checkSize);
  function checkSize(e) {
    let inp = e.target;
    if (inp.classList.contains("radioIn")) {
      switch (inp.id) {
        case "small":
          pizzaObj.changeSize(Pizza.SIZE_SMALL);
          break;
        case "mid":
          pizzaObj.changeSize(Pizza.SIZE_MIDLE);
          break;
        case "big":
          pizzaObj.changeSize(Pizza.SIZE_LARGE);
          break;
      };
      document.querySelector(".price p").innerHTML = `${pizzaObj.calculatePrice()}грн`;
    }

  }
  // Убегающая кнопка--------------------------------------------------------------------------------------------------------------------------
  const sale = document.querySelector("#banner");
  sale.addEventListener("mousemove",runSale);
  function runSale(e) {
    let div = e.target;
    // Справа
    if (e.offsetX>div.clientWidth/2) {
      // Если лево не ноль
      if (e.clientX-div.clientWidth>0) {
        div.style.left = `${e.clientX-div.clientWidth-20}px`;
      }
      // Если лево ноль
      else {
        div.style.left = `${e.clientX}px`;
      };
      // Сверху
      // Снизу
      moveDownUp(e, div)
    }
    // Слева
    else{
      // Если не выходит за экран по иксу
      if (document.documentElement.clientWidth>e.clientX+div.clientWidth) {
        div.style.left = `${e.clientX+20}px`;
      }
      // Если выходит
      else {
        div.style.left = `${e.clientX-div.clientWidth}px`;
      };
      // Сверху
      // Снизу
      moveDownUp(e, div)
    };
  };
  function moveDownUp(e, div) {
    // Сверху
    if (e.offsetY<div.clientHeight/2) {
      if (document.documentElement.clientHeight>(e.clientY+div.clientHeight)) {
        div.style.top = `${e.clientY+20}px`
      }
      else {
        div.style.top = `${e.clientY-div.clientHeight}px`
      }
    }
    // Снизу
    else {
      if (e.clientY-div.clientHeight>0) {
        div.style.top = `${e.clientY-div.clientHeight-20}px`
      }
      else {
        div.style.top = `${e.clientY}px`
      }

    }
  }

  // Drag-n-Drop-------------------------------------------------------------------------------------------------------------------------------
  const ingridients = document.querySelectorAll(".draggable")
  const ingridientContainer = document.querySelectorAll(".ingridients div");
  let elementClones = [];
  for (let i = 0; i < ingridients.length; i++) {
    elementClones[i] = null;
  }

  ingridients.forEach((item, ind ) => {
    item.addEventListener('mousedown', dragNDrop);
    function dragNDrop(e) {
      // Создаём видимо перемещающуюся картинку
      item.style.width = window.getComputedStyle(item.parentNode)["width"];
      item.style.position = 'absolute';
      // Перемещаем на ту же позицию
      moveAt(e);
      // переместим в body
      document.body.appendChild(item);

      // показывать над другими элементами
      item.style.zIndex = 1000;

      // передвинуть под координаты курсора
      // и сдвинуть на половину ширины/высоты для центрирования
      function moveAt(e) {
        item.style.left = e.pageX - item.offsetWidth / 2 + 'px';
        item.style.top = e.pageY - item.offsetHeight / 2 + 'px';
      }

      // перемещать по экрану
      document.addEventListener('mousemove', moveAt);

      // отследить окончание переноса
      item.addEventListener('mouseup',mouseUp);
      function mouseUp(e) {
        // Находи Эл-т под курсором
        item.hidden = true;
        let dropEl = document.elementFromPoint(e.clientX,e.clientY);
        item.hidden = false;

        if (!dropEl) return;
        // Находим ближайшего родителя с данным атрибутом
        let dropBox = dropEl.closest("[data-drop]");
        if (!dropBox) {  //Если такого нет
          item.style.cssText = ``;
          if (item.getAttribute("data-added") === "true") {
            switch (item.id) {
              case "sauceClassic":
                pizzaObj.removeSauce(Pizza.SAUCE_CLASSIC);
                break;
              case "sauceBBQ":
                pizzaObj.removeSauce(Pizza.SAUCE_BBQ);
                break;
              case "sauceRikotta":
                pizzaObj.removeSauce(Pizza.SAUCE_RIKOTTA);
                break;
              case "moc1":
                pizzaObj.removeTopping(Pizza.TOPPING_MOC1);
                break;
              case "moc2":
                pizzaObj.removeTopping(Pizza.TOPPING_MOC2);
                break;
              case "moc3":
                pizzaObj.removeTopping(Pizza.TOPPING_MOC3);
                break;
              case "telya":
                pizzaObj.removeTopping(Pizza.TOPPING_TELYA);
                break;
              case "vetch1":
                pizzaObj.removeTopping(Pizza.TOPPING_TOMAT);
                break;
              case "vetch2":
                pizzaObj.removeTopping(Pizza.TOPPING_MUSHRUM);
                break;
            }
          };

          item.dataset.added = false;

          // Убираем клон елемента
          elementClones[ind].remove()
          elementClones[ind] = null
          document.querySelectorAll(".ingridients span")[ind].classList.remove("circle");
          // Вставляем его на свое место
          ingridientContainer[ind].prepend(item);
        }
        else {
          item.style.cssText = ``;
          if (item.getAttribute("data-added") === "false") {
            switch (item.id) {
              case "sauceClassic":
                pizzaObj.addSauce(Pizza.SAUCE_CLASSIC);
                break;
              case "sauceBBQ":
                pizzaObj.addSauce(Pizza.SAUCE_BBQ);
                break;
              case "sauceRikotta":
                pizzaObj.addSauce(Pizza.SAUCE_RIKOTTA);
                break;
              case "moc1":
                pizzaObj.addTopping(Pizza.TOPPING_MOC1);
                break;
              case "moc2":
                pizzaObj.addTopping(Pizza.TOPPING_MOC2);
                break;
              case "moc3":
                pizzaObj.addTopping(Pizza.TOPPING_MOC3);
                break;
              case "telya":
                pizzaObj.addTopping(Pizza.TOPPING_TELYA);
                break;
              case "vetch1":
                pizzaObj.addTopping(Pizza.TOPPING_TOMAT);
                break;
              case "vetch2":
                pizzaObj.addTopping(Pizza.TOPPING_MUSHRUM);
                break;
            }
          };
          item.dataset.added = true;
          document.querySelectorAll(".ingridients span")[ind].classList.add("circle");
          dropBox.append(item);
        }

        document.querySelector(".price p").innerHTML = `${pizzaObj.calculatePrice()}грн`;
        document.querySelector(".sauces p").innerHTML = `${pizzaObj.getSauces().join(", ")}`;
        document.querySelector(".topings p").innerHTML = `${pizzaObj.getToppings().join(", ")}`;
        document.removeEventListener('mousemove', moveAt);
        item.removeEventListener('mouseup',mouseUp);
      };
      // Сделать клон элемента
      if (elementClones[ind] === null) {
          elementClones[ind] = item.cloneNode(true);
          elementClones[ind].style.position = "inherit";

          ingridientContainer[ind].prepend(elementClones[ind]);
      }
    };

  })
  window.ondragstart = function() {
    return false;
  };

  // Форма оформления заказа-------------------------------------------------------------------------------------------------------------------
  document.info.addEventListener("submit", validateForm);
  // Добавление +380
  document.info.elements[1].onfocus = (e) =>{
    let telef = e.target;
    if (telef.innerHTML === "") {
      telef.value = "+380"
    }
  }
  document.info.elements[3].onclick = resetErrors;
  // Функция валидации формы
  function validateForm(e){
    let errors = [];
    // Проходимся по каждому полю
    for (let i = 0; i < e.target.elements.length; i++) {
        if (e.target.elements[i].classList.contains("button")) continue;
        e.target.elements[i].addEventListener("focus", deleteError);
        // Если поле не валидно, выполняем условие
        if (!checkValid(e.target.elements[i])) {
          createError(e.target.elements[i]);
          errors.push(e.target.elements[i])
        }
    }
    // Проверяем валидность формы
    if (errors.length>0) {
      e.preventDefault();
    } else {
      e.preventDefault();
      document.location.href = "./thank-you.html"
    }
  };
  // Функция проверки поля на валидность
  function checkValid(item) {
      let reg ;
      if (item.name === 'name') {
        reg = /[a-zа-яа-ї]{3,}/i;
        return reg.test(item.value);
      };
      if (item.name === 'phone') {
        reg = /^\+380\d{9}$/g;
        return reg.test(item.value);
      };
      if (item.name === 'email') {
        reg = /^\w+@[a-z]{2,}\.[a-z]{2,4}$/g;
        return reg.test(item.value);
      };
    };
  // Функция создания сообщения об ошибке
  function createError(item) {
    let idError = item.name;
    let err = document.querySelector(`#${idError}`);
    err.style.width = `${item.clientWidth}px`;
    if (item.value === "") {
      err.innerHTML = "Заповніть поле"
    }
    else {
      err.innerHTML = item.dataset.msg;

    }
  };
  // Функция удаления сообщения об ошибке
  function deleteError(e) {
    let item = e.target;
    let idError = item.name;
    let err = document.querySelector(`#${idError}`);
    err.style.width = `0px`;
    err.innerHTML = ""
  };
  // Очистка всех сообщений об ошибке
  function resetErrors() {
    let errorsList = document.info.elements;
    for (var i = 0; i < errorsList.length; i++) {
      if (errorsList[i].classList.contains("button")) continue
      let err = document.querySelector(`#${errorsList[i].name}`);
      err.style.width = `0px`;
      err.innerHTML = ""
    }
  }
}
