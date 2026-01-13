# Examenopdracht: MiniShop (Expo React Native)

## Verplicht te gebruiken

- Expo + React Native
- TypeScript
- TanStack Query
- Redux Toolkit
- Navigatie: React Navigation of Expo Router (jij kiest)

## MUST (minimum)

### 1 Navigatie

- [x] Tabs (3): Home, Cart, Profile
- [x] Home stack: ProductList → ProductDetail
- [x] Routes/params typed in TypeScript

### 2) Data (DummyJSON) met TanStack Query

- [x] Product list ophalen en tonen: https://dummyjson.com/products
- [x] Product detail ophalen en tonen: https://dummyjson.com/products/{id}
- [ ] Toon duidelijke loading / error / empty states

### 3) Redux Toolkit (global state)

- [x] `cartSlice`:
  - [x] add to cart (vanuit detail)
  - [x] quantity +/-
  - [x] remove item
- [x] Selectors (verplicht):
  - [x] totaal items (sum quantities)
  - [x] subtotal (sum price \* qty)

### 4) Profile (cross-tab bewijs)

- [x] Toon op Profile:
  - [x] item count + subtotal (via selectors)
  - [x] knop “Go to Cart”

### 5) Theme

- [x] Light/Dark toggle
- [x] Theme zichtbaar toegepast (background/tekst/cards)

### 6) UI/UX

- [ ] Nette product cards en layout
- [ ] UI states zijn zichtbaar en netjes

## EXTRA PUNTEN (kies max 2)

Kies max. 2 van de volgende:

- [ ] Search met debounce
- [ ] Load more pagination
- [ ] Favorites (toggle + lijst op Profile)
- [ ] Extra setting (grid/list of show ratings)
- [x] AsyncStorage persist (theme + cart)

## Werkwijze (verplicht)

- Werk in GitHub repository
- Maak regelmatige commits met duidelijke commit messages

## Indienen (verplicht)

- Project zippen zonder `node_modules`
- Bestandsnaam zip: `Voornaam_Achternaam.zip`
- In de app/projectnaam: Voornaam Achternaam zichtbaar (bv. in Profile header of app title)
