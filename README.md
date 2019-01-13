Tool: Substance Painter 'Merger'
Version: 0.1

Why This?
Substance painter is amazing with a flaw that is yet to be addressed and that is merging texture sets, usually when people model they seperate objects in to parts to focus on perfecting them before putting them together as a whole. During this process, the UV layout is also created to focus on texturing a single part then rendering just a single material for a model; Substance fails in this aspect, rather it renders a seperate texture set for every object leaving the end user to try to merge them all into one with a different tool which is a time consuming process. Painter also has a little handy tool that exports all selected texture sets to Adobe Photoshop for further manipulation. 'Merger' seeks to utilize that tools output to automate the texture set merging process, saving you hours of work.

After investigating the workflow and structure of the materials imported into photoshop from the 'Export to photoshop tool'

Heres my workflow for merging textures
 Quite simple, selecting all the layers and dragging them to its matching Map suffix, so tail_normal layers are copied and pasted in head_normal tab in photoshop. The set is now exported as a .png file and I have just one set of that map instead of two.

 Pseudocode
 - regEx find open tabs with the suffix in array _["basecolor","normal","metallic" etc...]
 - assign each tabs path?? to variables
 - loop if suffix exists, 
 - turn on the layer 'snapshot', found it easier to align my textures with snapshot on since it doe snot have transparency and is consistent among maps.
 - copy all layers
 - paste them to the first element with matching suffix 
 - rename as regEx before _suffix for [0] && append extension .png
 - export to the same folder as path for psd export

 Issues
 - no ES6 syntax works
 - count variables changes in a for loop if not set on start so doc.length should be set to a variable before using the var for the range
- no propper debugging solution
