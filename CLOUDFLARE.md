# Deploiement sur Cloudflare Pages

Le formulaire utilise `POST /api/contact`, traite par `functions/api/contact.js`.
Cette fonction appelle Resend par HTTPS. La cle Resend reste cote serveur.
Le formulaire WhatsApp conserve son fonctionnement actuel.

## Configuration du projet Pages

1. Dans Workers & Pages, creer un projet Pages connecte au depot GitHub.
2. Choisir la branche de production souhaitee (actuellement `main`).
3. Commande de build : `npm run build`.
4. Repertoire publie : `dist`.
5. Utiliser Node.js 22 ou 24 pour le build (`NODE_VERSION=22` si necessaire).
6. Le nom dans `wrangler.toml` doit correspondre au nom du projet Pages.

Le build compile les sources React et inclut les captures des projets, les polices,
`robots.txt`, `sitemap.xml` et `_routes.json`. Seules les routes `/api/*` invoquent
une Function. Les sources, les tests et les secrets ne font pas partie de `dist`.

## Resend

Dans les parametres du projet Pages, ajouter ces valeurs en tant que **secrets**
dans Variables and Secrets, pour l'environnement Production :

| Nom | Valeur |
| --- | --- |
| `RESEND_API_KEY` | La cle API Resend, avec permission d'envoi |
| `CONTACT_FROM_EMAIL` | L'expediteur autorise par Resend, par exemple `Gabriel <contact@votre-domaine.com>` |
| `CONTACT_TO_EMAIL` | `gabrielhalim01@gmail.com` |

Ne jamais ajouter la cle au code, a Git ou a une variable prefixee `VITE_`.
Redeployer apres avoir configure les secrets. Les secrets Preview sont separes :
ne les activer que si les previews doivent pouvoir envoyer de vrais messages.

L'adresse du visiteur est utilisee comme `reply_to`, jamais comme expediteur.
Le domaine de l'expediteur doit etre verifie dans Resend avec les enregistrements
DNS fournis par Resend. `onboarding@resend.dev` est reserve aux essais vers
l'adresse du proprietaire du compte Resend ; il ne remplace pas un domaine verifie.
Cloudflare heberge le site, tandis que Resend reste le service d'envoi.

## Adresse du site et referencement

Definir la variable de build `SITE_URL` avec l'origine publique de production,
par exemple `https://votre-domaine.com`. Le build l'applique aux liens canoniques,
Open Graph, donnees structurees, robots et sitemap.

Sans `SITE_URL`, un build Cloudflare utilise `CF_PAGES_URL`. Un build local
conserve l'ancienne adresse Vercel comme valeur de repli.
Configurer `SITE_URL` avant la mise en production sur le domaine definitif.

## Verification locale

```sh
npm ci
npm test
npm run build
npm run preview:pages
```

Pour tester un envoi reel localement, renseigner un fichier `.dev.vars` prive
avec les trois variables Resend ci-dessus. Ce fichier est ignore par Git.
Sans ces valeurs, le formulaire renvoie une erreur de configuration explicite.
Les tests automatises simulent Resend et n'envoient aucun e-mail.

Avant de retirer Vercel, verifier sur l'URL Pages : les captures des projets,
les galeries, la navigation mobile et un envoi reel recu dans la boite cible.
Les fichiers de compatibilite Vercel sont conserves pour la transition.

References :
- https://developers.cloudflare.com/pages/functions/get-started/
- https://developers.cloudflare.com/pages/functions/wrangler-configuration/
- https://resend.com/docs/api-reference/emails/send-email
