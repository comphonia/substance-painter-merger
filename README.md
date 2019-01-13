Tool: Substance Painter 'Merger'
Version: 1.0

Why This?
Substance painter is amazing with a flaw that is yet to be addressed and that is merging texture sets, usually when I make a 3D model I seperate objects in parts to focus on perfecting them before putting them together as a whole. During this process, the UV layout is also created to focus on texturing a single part then rendering just a single material for a model; Substance fails in this aspect, rather it renders a seperate texture set for every object leaving the artist to try to merge them all into one with a different tool such as photoshop which is a time consuming process. Painter, however has a little handy tool that exports all selected texture sets to Adobe Photoshop for further manipulation. 'Merger' utilizes its output to automate the texture set merging process, saving you hours of work.

After investigating the workflow and structure of the materials imported into photoshop from the 'Export to photoshop tool'

Heres my workflow for merging textures
 Quite simple, selecting all the layers and dragging them to its matching Map suffix, so tail_normal layers are copied and pasted in head_normal tab in photoshop. The set is now exported as a .png file and I have just one set of that map instead of two.

 Pseudocode
 - regEx find open tabs with the suffix in array _["basecolor","normal","metallic" etc...]
 - assign each tabs path?? to variables
 - loop if suffix exists, 
 - turn on the layer 'snapshot', found it easier to align my textures with snapshot on since it does not have transparency and is consistent among maps.
 - copy all layers
 - paste them to the first element with matching suffix 
 - rename as regEx before _suffix for [0] && append extension .png
 - export to the same folder as path for psd export

 Inconveniences
 - no ES6+ syntax works
 - no proper debugging solution
