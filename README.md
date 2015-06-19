#JQuery BubbleFilter
This is a very simple filtering plugin. It takes only three parameters and will produce a fancy filtering div that allows your users to filter large sets of data easily.

The css used in the this plugin is scss. There is one parameter at the top of the scss file that allows you set the width of the page to stack the columns rather than display in columns. All responsive like.

To compile the scss and minify the javascript run `grunt` or `grunt watch`.

##Parameters

**placeholderText**: The text that will be placed inside the bubble filter element when there are no options selected. The **default** value is 'Click here to select attributes to filter by'.

**selectedTagCallback**: This function will be called with the currently selected tags after a tag is selected or removed. **default** is and undefined function. The callback will do nothing until this is populated. 

**closeButtonClass**: The close button next to the tag in the bar will have an icon with this class added next to it. This is the button that removes the tag from the selected filters. NOTE: I'm using font-awesome in the demo so the **default** class is 'fa fa-close'.

**scrollToInput**: Scroll the window back to the input area after a filter has been selected. **default** is true.

**scrollOffset**: When scrolling back to the input sometimes there is a floating menubar in the way or you might want some leeway for the input area, this will scroll to the input area and leave this many pixels between the input area and the top of the page. **default** 90.

**tags**: This is a javascript object of tags that will be displayed in the dropdown when the bubble filter div is clicked on.

##Initialize the function
In your javascript you will need to include this along with the includes for the dist/js/jquery.bubbleFilter.min.js and dist/css/jquery.bubbleFilter.min.css and jQuery itself. The tags can be generated somehow, but they need to be in the format that this tags object is.
```
var tags = {
    "Column 1": {
        1: "Tag 1",
        2: "Tag 2",
        3: "Tag 3",
        4: "Tag 4",
        5: "Tag 5",
        6: "Tag 6",
    },
    "Column 2": {
        7: "Tag 7",
        8: "Tag 8",
        9: "Tag 9",
        10: "Tag 10",
        11: "Tag 11",
    },
    "Column 3": {
        12: "Tag 12",
        13: "Tag 13",
        14: "Tag 14",
        15: "Tag 15",
    },
    "Column 4": {
        16: "Tag 16",
        17: "Tag 17",
        18: "Tag 18",
        19: "Tag 19",
        20: "Tag 20",
    },
    "Column 5": {
        21: "Tag 21",
        22: "Tag 22",
        23: "Tag 23",
        24: "Tag 24",
        25: "Tag 25",
    },
};

$(function() {
    $('#bubble-filter').bubbleFilter({
        tags: tags,
        placeholderText: "Click here to selected attributes to filter by",
        closeButtonClass: "fa fa-close",
        selectedTagCallback: function(selectedTags) {
            console.log(selectedTags);
            // Perform any action you need to filter your objects by the selected tags here
        },
    });
});
```
Then in your body you will include
```
<div id="bubble-filter"></div>
```
##Development
To ease development use ```grunt watch```. This will watch for any changes in the css and js files and recompile them, if necessary, and place the compiled files into the dist directory.