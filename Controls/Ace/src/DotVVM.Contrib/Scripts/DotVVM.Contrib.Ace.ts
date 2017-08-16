/// <reference path="typings/dotvvm.d.ts"/>
/// <reference path="typings/knockout/index.d.ts"/>
/// <reference path="typings/ace/index.d.ts"/>

module DotvvmContribAce {
    ko.bindingHandlers["dotvvm-contrib-Ace"] = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var model = viewModel;
            var prop = valueAccessor();

            // TODO: init the control and subscribe to its events
            var editor = ace.edit(document.getElementByDotvvmId(element));

            // Set the settings for now.
            editor.setTheme("ace/theme/" + "monokai");
            editor.getSession().setMode("ace/mode" + "javascript");
            editor.setReadOnly(true);

            editor.getSession().setValue(prop.value());

            // Bind events
            editor.getSession().on("change", function (delta) {
                if (ko.isWriteableObservable(valueAccessor())) {
                    valueAccessor()(editor.getValue());
                }
            });

            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                editor.destroy();
            });
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var value = ko.unwrap(valueAccessor());

            // TODO: update the control with a new value from the viewmodel
            element.getSession().setValue(value);
        }
    };
}