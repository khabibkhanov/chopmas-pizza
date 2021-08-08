const pizzaSelect = document.querySelector(".pizza-select"); // Pizza selectini chaqirib olindi
const pizzaSelectResult = document.querySelector(".pizza-result-thickness"); // Pizza selectdan qaytgan qiymat uchun joy chaqirib olindi!

const pizzaRadio = document.querySelectorAll(".pizza-radio"); // Pizzaning o'lchamini kiritilishi kerak bo'lgan radiolar chaqirib olindi
const pizzaRadioResult = document.querySelector(".pizza-result-size"); // Pizza o'lchamlarini ko'rsatish uchun ajratilgan joy chaqirib olindi

const pizzaIng = document.querySelectorAll(".pizza-ing"); // Pizza masalliqlari uchun tayyorlangan checkboxlar chaqirib olindi
const pizzaIngResult = document.querySelector(".pizza-result-ings"); // Pizza checkboxdan qaytgan qiymatdagi masalliqlarni korsatish uchun ajratilgan joy chaqirib olindi

const pizzaExtraIng = document.querySelectorAll(".pizza-extra-ing"); // qo'shimcha Pizza masalliqlari uchun tayyorlangan checkboxlar chaqirib olindi
const pizzaExtraIngResult = document.querySelector(".pizza-result-extra-ings"); // qo'shimcha Pizza checkboxdan qaytgan qiymatdagi masalliqlarni korsatish uchun ajratilgan joy chaqirib olindi

let ingredients = []; // masalliqlar checkboxdagi qiymatni solish uchun bosh array ochildi
let extraIngredients = []; // qoshimcha masalliqlar checkboxini solish uchun ham bosh array ochildi

window.addEventListener('load', function() { // sahifa zagruzka bo'lganda... eventi  
  pizzaSelectResult.textContent = pizzaSelect.value; // pizza selectda turgan boshlangich qiymat shu selectdan qaytgan natija uchun ajratilgan joyga tushsin
});

pizzaSelect.addEventListener('change', function() { // Pizza selectning qiymatini o'zgartirganda....
  pizzaSelectResult.textContent = this.value; //tanlangan qiymat shu selectdan qaytgan natija uchun ajratilgan joyga tushsin
});

pizzaRadio.forEach(function(radio) { // ko'p radio el'larni bir xil classda chaqirganimiz uchun shu elementlarni forEach() orqali funksiyada ishlatildi
  radio.addEventListener('change', function() { // radio qiymati o'zgarsa ....
    pizzaRadioResult.textContent = this.value; // radiodan qaytgan qiymat radio natijalari uchun ajratilgan joyga tushsin
  });
});

function listQoshator(checkboxList, checkboxResult, ingredientsArr, idTitle) { // checkboxlarimiz tanlanib va keyin yana olib tashlanishini yozish uchun funksiya ochildi
  checkboxList.forEach(function(checkbox) { // bu yerda ham xuddi radio singari forEach() ishlatildi
    checkbox.addEventListener('change', function() { // checkboxlarni qiymati o'zgarsa ....
      let listItem = document.createElement('li'); // masalliqlar ro'yxatini tuzish uchun 'li' degan element yasaldi va uni listItem degan o'zgaruvchiga tenglab olindi
      listItem.textContent = this.value; // checkboxda tanlangan qiymat listItemning ichiga qo'yiladi
      listItem.setAttribute('id', `${idTitle}-${this.value}`); // listItemga 'id' degan atrribut qo'shildi va ichidagi qiymati idTitle degan o'zgaruvchiga va tanlangan checkboxning qiymatiga tenglashtirilib olindi

      if(ingredientsArr.includes(this.value)) { // agar kiritilgan parametr arrayning ichida bo'lsa...
        // Note: includes() unga berilgan parametr array elementlari orasida bor yoki yo'qligini tekshiradi
      
        document.querySelector(`#${idTitle}-${this.value}`).remove(); // .... ushbu id dagi element allaqachon bor bo'lsa u arraydan o'chib ketsin

        var deletedElementIndex = ingredientsArr.indexOf(this.value); // o'chirilgan qiymatni ingredientsArr arrayidagi kiritilgan argumentning indexsini olish uchun deletedElementIndex degan o'zgaruvchi e'lon qilindi va buning uchun indexOf() usuli foydalanildi
          //Note: IndexOf usuli argument sifatida qiymatga teng bo'lgan element indeksini qaytaradi.

        ingredientsArr.splice(deletedElementIndex, 1); // ingredientsArr arrayidan deletedElementIndex dan boshlab faqat 1 ta elementni splice() orqali olib tashlandi
          // Note: Splice () usuli mavjud elementlarni yo'q qilish va / yoki yangilarini qo'shish orqali array tarkibini o'zgartiradi.

      } else { // Aks xolda....
        checkboxResult.appendChild(listItem); // Checkbox resultga listItem qoshiladi
        ingredientsArr.push(this.value); // ingredientsArr arrayiga qiymat kiritiladi
      }
    });
  });
}

listQoshator(pizzaIng, pizzaIngResult, ingredients, 'ing'); // masalliqlar royxati uchun funksiya moslanib chaqirib olinadi
listQoshator(pizzaExtraIng, pizzaExtraIngResult, extraIngredients, 'extra-ing'); // qoshimcha masalliqlar uchun funksiya chaqirib olinadi

// Tugadi...