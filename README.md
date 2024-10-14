
# Text Justification API

## Description

**Text Justification API** est une API REST qui permet de justifier des textes à une largeur de 80 caractères par ligne. Elle inclut une authentification par token, un système de limitation de requêtes par jour, et accepte les requêtes avec un body au format `text/plain`.

## Fonctionnalités

- Justification du texte à une largeur fixe de 80 caractères par ligne.
- Authentification via token unique, généré à partir d'une adresse e-mail.
- Limitation d'utilisation par token à 80 000 mots par jour (rate limit).
- Support des requêtes avec le format `text/plain`.

---

## Table des matières

- [Installation]
- [Utilisation]
  - [Générer un token]
  - [Justifier un texte]
  - [Limitation de requêtes (Rate Limit)]
- [Endpoints de l'API]


---

## Installation

### Prérequis

- **Node.js** (version 14 ou supérieure)
- **npm** (ou **yarn**)

### Étapes d'installation

1. Clonez ce repository sur votre machine locale :

   ```bash
   git clone https://github.com/akramIbriz/Exo_Tictactrip-.git
   ```

2. Installez les dépendances :

   ```bash
   npm install
   ```

3. Démarrez le serveur local :

   ```bash
   npm start
   ```

   Le serveur sera lancé sur `http://localhost:3000`.

---

## Utilisation

Cette API utilise deux endpoints principaux : un pour générer un token d'authentification et un pour justifier un texte. Voici comment utiliser l'API.

### Générer un token

- Pour utiliser l'API, vous devez d'abord générer un token unique basé sur votre adresse e-mail. Ce token sera utilisé pour authentifier toutes vos requêtes vers l'API.

#### Requête

- **Méthode** : `POST`
- **Endpoint** : `/api/token`
- **Body** : JSON avec l'email

```bash
curl -X POST http://localhost:3000/api/token \
-H "Content-Type: application/json" \
-d '{"email": "foo@bar.com"}'
```

#### Réponse

```json
{
  "token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
}
```

### Justifier un texte

- Après avoir obtenu un token, vous pouvez envoyer un texte à justifier.

#### Requête

- **Méthode** : `POST`
- **Endpoint** : `/api/justify`
- **Headers** : Ajoutez un header `Authorization` avec votre token : `Authorization: Bearer {token}`.
- **Body** : Texte brut à justifier (`text/plain`).

```bash
curl -X POST http://localhost:3000/api/justify \
-H "Authorization: Bearer {votre_token}" \
-H "Content-Type: text/plain" \
--data-binary @file.txt
```

#### Réponse

Le texte sera retourné avec une largeur justifiée de 80 caractères par ligne.

### Limitation de requêtes (Rate Limit)

- Chaque token est limité à **80 000 mots par jour**. Si vous dépassez cette limite, l'API vous renverra une erreur.

#### Réponse si la limite est atteinte

```json
{
  "error": "Payment Required: Word limit exceeded"
}
```

---

## Endpoints de l'API

Voici un récapitulatif des endpoints disponibles :

1. **Génération de token :**
   - **URL** : `/api/token`
   - **Méthode** : `POST`
   - **Description** : Génère un token unique basé sur un email.

2. **Justification de texte :**
   - **URL** : `/api/justify`
   - **Méthode** : `POST`
   - **Description** : Justifie un texte à une largeur de 80 caractères par ligne.
   - **Headers** : `Authorization: Bearer {token}`
   - **Body** : `text/plain`


---


