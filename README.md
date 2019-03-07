## Tool: Substance Painter 'Submerger'
#### Version: 1.0
#### Platform: Windows and Mac

### Why This?
Substance Painter is a amazing, there is one issue that is yet to be addressed and that is merging texture sets, `submerger` helps solve that. Although not a substance painter plugin, it is used in conjunction with the `Export to Photoshop` plugin, already available in Substance Painter 2018, to help automate the process of merging textures.

### How to Use Submerger
- download `submerger.jsx`
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
 - Single mesh with 2 or more sub-objects or texture set `passed`
 - Exporting identical maps for both sets `passed`
 - Exporting non-identical maps (i.e basecolor & normal for set1 and only normal for set2) `passed`
 - Exporting all map sets `passed`
 - Some map names such as `04 default` - `failed` since the regEx does not account for the spacing, will be fixed in next update.
 
 ### Misc
 Find bugs? feel free to [message me](https://www.comphonia.com/#contact) or create an issue
 
 Want to fix it yourself? Create a pull request
 
 Want to say thanks with coffee?    [![ko-fi](https://www.ko-fi.com/img/donate_sm.png)](https://ko-fi.com/X8X5OPHE)
