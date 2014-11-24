define(function(require, exports, module) {
    main.consumes = [
        "Plugin", "layout", "menus", "tabinteraction"
    ];
    main.provides = ["theme.flat-light"];
    return main;

    function main(options, imports, register) {
        var Plugin = imports.Plugin;
        var menus = imports.menus;
        var layout = imports.layout;
        var tabinteraction = imports.tabinteraction;
        
        /***** Initialization *****/
        
        var plugin = new Plugin("Ajax.org", main.consumes);
        var emit = plugin.getEmitter();
        
        var oldHeight, oldMinimizedHeight, oldTabInteraction;
        
        var loaded = false;
        function load() {
            if (loaded) return false;
            loaded = true;
            
            var update = function(e){
                if (e.theme == "flat-light") {
                    layout.getElement("logobar").setHeight(40);
                    oldHeight = menus.height;
                    oldMinimizedHeight = menus.minimizedHeight;
                    oldTabInteraction = tabinteraction.plusMargin;
                    
                    menus.height = 40;
                    menus.minimizedHeight = 8;
                    
                    tabinteraction.plusMargin = 14;
                }
                else if (e.oldTheme == "flat-light") {
                    layout.getElement("logobar").setHeight(31);
                    
                    menus.height = oldHeight;
                    menus.minimizedHeight = oldMinimizedHeight;
                    
                    tabinteraction.plusMargin = oldTabInteraction;
                }
            };
            
            layout.on("themeChange", update);
            
            if (layout.theme == "flat-light")
                update({ theme: layout.theme });
        }
        
        var drawn = false;
        function draw() {
            if (drawn) return;
            drawn = true;
            
            emit("draw");
        }
        
        /***** Methods *****/
        
        /***** Lifecycle *****/
        
        plugin.on("load", function() {
            load();
        });
        plugin.on("enable", function() {
            
        });
        plugin.on("disable", function() {
            
        });
        plugin.on("unload", function() {
            loaded = false;
            drawn = false;
        });
        
        /***** Register and define API *****/
        
        /**
         * 
         **/
        plugin.freezePublicAPI({
            
        });
        
        register(null, {
            "theme.flat-light": plugin
        });
    }
});