# Heardle React

This project is a Heardle game base written in React whose goal is to provide an easier way to create your own Heardle app (easier than editing the minified code). This also allow to have a common base for multiple Heardle games.

This project combine a daily Heardle and an infinite version.

This is a recreation of the multiple "glitch.me" Heardle games, more specifically the [Pokemon Infinite Heardle](https://nterrien.github.io/pkmn-infinite-heardle/)

Preview here : https://prateau.github.io/heardle-react/

## Create your own Heardle

You can fork this project to create your own Heardle game.

You may need to create a github organization to fork this project multiple times

### Add music

The first step is to replace the content of the `src/config/categories.json` and `src/config/music.json` file with your musics.

The data must be in this format :
- `src/config/categories.json` :
```json
[
  {
    "id": {unique id for the category},
    "name": {
      "en": {the name of the category in english},
      {you can add other languages here}
    }
  },
  {other categories}
]
```
- `src/config/musics.json` :
```json
[
  {
    "id": {unique id for the music},
    "url": {soundclound link},
    "name": {
      "en": {the name of the music in english},
      {you can add other languages here}
    },
    "categoryId": {id of the coresponding category}
  },
]
```

> ℹ️  The musics and categories are sorted by id in the modale that lists all musics.

### Wording

The localization is powered by i18next. To edit the wording, you can modify the files `src/config/i18n/en.json` and `src/config/i18n/fr.json`.

By default, the app support English and French, see the next section if you want to add or remove a language.

You will likely have to change the content of the the following traduction keys :
- `heardleName`
- `header.infos.text`
- `header.about.text`
- `endPage.message.link`

#### Add / Remove a language

To remove a language :
- in the file `src/config/i18n/i18n.ts`, remove the language from :
  - the `Locales` enum
  - the `resources` const
  - the `supportedLngs` parameter
- delete the corresponding translation file (for exemple `src/config/i18n/fr.json`)
- in the file `src/components/header/ModaleLanguage.tsx`, remove the corresponding case in the method `getLocaleFlag` (if you only have one language, you may want to completly remove this component)
- finally, you can then remove the svg flag from `src/img`

To add a language, this is pretty much the same actions in reverse :
- add the corresponding flag in `src/img` (I use the flags from https://github.com/lipis/flag-icons)
- in the file `src/components/header/ModaleLanguage.tsx`, add the corresponding case in the method `getLocaleFlag` (with the new flag svg)
- add a translation file in `src/config/i18n`
- in the file `src/config/i18n/i18n.ts`, add the new language in :
  - the `Locales` enum
  - the `resources` const (associated with the translation file)
  - the `supportedLngs` parameter

### Other changes

- To change the tab icon, you can replace the `public/favicon.png` file.
- To modify the title of the tab, you can change the content of the `<title>` tag in `index/html`
- In the file `src/config/const.ts`, you can :
  - change `HEARDLE_SPLITS` if you want custom splits to your heardle
  - change `START_DATE` to change the id of your daily heardle
  - change the name of the elements in `LocalStorageKeys`. This is important if you plan to host multiple heardle on the same domain, **each Heardle must have differents local storage keys**

### Deployment

This project auto builds on github page folowing this exemple : https://github.com/sitek94/vite-deploy-demo

The workflows auto create a branch `gh-pages` ready to be published with [Github Pages](https://pages.github.com/). To enable the auto publish it you have to :
- Enable Actions for this project
- Ensure Actions have `write` permission (https://github.com/sitek94/vite-deploy-demo?tab=readme-ov-file#ensure-actions-have-write-permission)
- Configure Github Pages to use the branch `gh-pages` (https://github.com/sitek94/vite-deploy-demo?tab=readme-ov-file#enable-github-pages)
- Modify the base url in `vite.config.ts` (https://github.com/sitek94/vite-deploy-demo?tab=readme-ov-file#fix-assets-links)

## Developpement

This project runs with node 22. To setup the project just run

```
npm install
```

Then you can start the project with

```
npm run dev
```

## Credits

- This app is written in Typescript with Vite and React
- souncloud API
- The fr and gb flags come from https://github.com/lipis/flag-icons

## Future changes

- better responsive for the header menu
- work on accessibility
- add history in the stats modale
- add a volume bar
- add a menu to filter musics with their categories
- translate html title
- better link
