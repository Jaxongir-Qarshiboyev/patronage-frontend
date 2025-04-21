```markdown
# Hamshiralar Monitoring Tizimi (Frontend)

![React](https://img.shields.io/badge/React-18.2.0-blue.svg)
![Material-UI](https://img.shields.io/badge/Material--UI-5.14.16-purple.svg)

Ushbu loyiha **Hamshiralar Monitoring Tizimi**ning frontend qismidir. Bu tizim hamshiralarga oilalarni patronaj qilish, tashriflarni boshqarish va monitoring ma'lumotlarini ko‘rish imkonini beradi. Frontend React va Material-UI yordamida qurilgan bo‘lib, backend API bilan muloqot qiladi.

## 📋 Loyiha haqida

- **Framework**: React 18.2.0
- **UI kutubxonasi**: Material-UI 5.14.16
- **Routing**: React Router 6.18.0
- **API muloqoti**: Axios 1.6.0

## 🛠 O‘rnatish va ishga tushirish qadamlari

### 1-qadam: Kerakli dasturlarni o‘rnatish
Loyiha ishga tushishi uchun quyidagi dasturlar o‘rnatilgan bo‘lishi kerak:
- **Node.js va npm**: Node.js 16+ versiyasi o‘rnatilgan bo‘lishi kerak. Tekshirish uchun:
  ```bash
  node --version
  npm --version
Agar o‘rnatilmagan bo‘lsa, rasmiy saytdan yuklab o‘rnating.

Git: Git o‘rnatilganligini tekshirish uchun:
bash

Copy
git --version
Agar o‘rnatilmagan bo‘lsa, rasmiy saytdan o‘rnating.
2-qadam: Repozitoriyani klon qilish
Loyihani mahalliy kompyuteringizga yuklab oling:

bash

Copy
git clone https://github.com/Jaxongir-Qarshiboyev/patronage-frontend.git
cd patronage-frontend
3-qadam: Kerakli paketlarni o‘rnatish
Loyihaning barcha qaramliklarini o‘rnating:

bash

Copy
npm install
Agar o‘rnatishda xato chiqsa, node_modules ni o‘chirib, qayta urining:

bash

Copy
rm -rf node_modules package-lock.json
npm install
4-qadam: Backend serverini ishga tushirish
Frontend loyiha backend API’ga bog‘liq. Backend loyihasini ishga tushirganingizga ishonch hosil qiling:

Backend repozitoriyasi: Hamshiralar Monitoring Tizimi Backend
Backendni ishga tushirish uchun yuqoridagi backend README.md dagi qadamlarni bajaring.
Backend API manzili: http://127.0.0.1:8000/api/
5-qadam: Frontend serverini ishga tushirish
React serverini ishga tushiring:

bash

Copy
npm start
Server ishga tushganda quyidagi xabarni ko‘rasiz:

text

Copy
Local: http://localhost:3000
6-qadam: Loyihani sinab ko‘rish
Brauzerda quyidagi manzillarni oching:

Asosiy sahifa: http://localhost:3000/
Oilalar ro‘yxati: http://localhost:3000/families
Patronajlar: http://localhost:3000/household-patronages
Yangi patronaj qo‘shish: "Add Household Patronage" tugmasini bosing va ma'lumotlarni kiriting.
📦 Foydalanilgan paketlar
react==18.2.0
react-dom==18.2.0
react-router-dom==6.18.0
@mui/material==5.14.16
@mui/icons-material==5.14.16
axios==1.6.0
🔧 Qo‘shimcha sozlamalar
API manzili: Agar backend boshqa manzilda ishlayotgan bo‘lsa, axios so‘rovlarida URL’ni o‘zgartiring. Masalan, src/components/HouseholdPatronages.js faylida:
javascript

Copy
axios.get('http://127.0.0.1:8000/api/household-patronages/')
ni kerakli manzilga o‘zgartiring.
Kalendar integratsiyasi: Kelajakda @mui/x-date-pickers yordamida tashrif sanasi uchun kalendar qo‘shilishi rejalashtirilgan. Hozircha sana qo‘lda kiritiladi.
Dizayn: Material-UI’ning mavzusi App.js da sozlanishi mumkin. Gradient AppBar qo‘shish uchun App.js da quyidagi kodni qo‘shing:
javascript

Copy
<AppBar sx={{ background: 'linear-gradient(45deg, #1976D2 30%, #4CAF50 90%)' }}>
📄 Loyiha tuzilishi
src/components/: React komponentlari (Families, HouseholdPatronages va boshqalar).
src/App.js: Asosiy dastur logikasi va routing.
src/assets/: Logotip va boshqa statik fayllar.
🤝 Hissadorlik
Loyiha ochiq manba sifatida taqdim etiladi. Agar o‘zgarishlar kiritmoqchi bo‘lsangiz:

Repozitoriyani fork qiling.
O‘zgarishlarni kiritib, commit qiling.
Pull request yuboring.
📞 Aloqa
Savollar yoki takliflar bo‘lsa, Jaxongir Qarshiboyev bilan bog‘laning.

© 2025 Hamshiralar Monitoring Tizimi loyihasi