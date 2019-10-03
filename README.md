[![Travis (.org)](https://img.shields.io/travis/comphonia/substance-painter-merger)](https://travis-ci.com/comphonia/substance-painter-merger)
![Issues](https://img.shields.io/github/issues/comphonia/substance-painter-merger)
![Github Stars](https://img.shields.io/github/stars/comphonia/substance-painter-merger)
![License](https://img.shields.io/github/license/comphonia/substance-painter-merger)
## Tool: Substance Painter 'Submerger'
#### Version: 1.0
#### Platform: Windows and Mac

### Why This?
Substance Painter is a amazing, there is an issue that is yet to be addressed and that is merging texture sets, `submerger` helps solve that. Although not a substance painter plugin, it is used in conjunction with the `Export to Photoshop` plugin, already available in Substance Painter 2018 +, to help automate the process of merging textures.

### How to Use Submerger
- download or copy `submerger.jsx` from `dist\submerger.jsx`
- export materials sets to photoshop using the `Export to Photoshop` plugin. choose materials you need.
- In photoshop, navigate to `File > Scripts > Browse` and select the `submerger.jsx` file
- Thats it! :smiley: navigate to your Substance Photoshop exports folder to find your merged materials.
> :video_camera: [Youtube Tutorial](https://www.youtube.com/watch?v=_XI0rpOZBD0) 
##

Note: you can avoid navigating to the folder everytime by adding the scripts to your `File > Scripts` menu  

 MacOS: /Applications/Adobe Photoshop [VERSION]/Presets/Scripts/  
 
 Windows: C:/Program Files/Adobe/Adobe Photoshop [VERSION]/Presets/Scripts/

### Testing
This is just a little utility I made to make my life easier, not necessarily a full solution. 
##### Adobe Photoshop cc2014 & Substance Painter 2018.1
&&
##### Adobe Photoshop cc2017 & Substance Painter 2019.1
 - Single mesh with 2 or more sub-objects or texture set `passed v1.0.0`
 - Exporting identical maps for both sets `passed v1.0.0`
 - Exporting non-identical maps (i.e basecolor & normal for set1 and only normal for set2) `passed v1.0.0`
 - Exporting all map sets `passed v1.0.0`
 - Some map names such as `04 default` - `failed v1.0.0` since the regEx does not account for the spacing, will be fixed in next update.

 ### Developers
 Photoshop, like most adobe products, still use es3, so from `v1.0.1`, [extendscriptr](https://www.npmjs.com/package/extendscriptr) will be used for polyfilling so you any ES4+ JS environment for development. 
 - Clone the repo
 - Make changes to the `src/submerger.jsx`
 - Run code analysis `npm run test`
 - Build code `npm run build`
 - Test in photoshop using `dist/submerger.jsx`
 
 ### Misc
 Find bugs? feel free to [message me](https://www.comphonia.com/#contact) or create an issue
 
 Want to fix it yourself? Create a pull request
 
 Want to say thanks with coffee?    [![ko-fi](https://www.ko-fi.com/img/donate_sm.png)](https://ko-fi.com/X8X5OPHE)
