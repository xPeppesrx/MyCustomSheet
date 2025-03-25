Hooks.on('init', () => {
    console.log("My Custom Sheet | Inizializzazione!");

    // Registra la nuova scheda personaggio
    DocumentSheetConfig.registerSheet(Actor, "dnd5e", "my-custom-sheet.CharacterSheet", MyCustomCharacterSheet, {
        types: ["character"],
        makeDefault: false //Non rendere predefinita, per ora
    });
});

class MyCustomCharacterSheet extends ActorSheet {
    /** @override */
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions(), {
            classes: ["dnd5e", "actor", "character", "my-custom-sheet"],
            template: "modules/my-custom-sheet/templates/actor-sheet.html",
            width: 800,
            height: 700,
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "attributes" }]
        });
    }

    /** @override */
    getData() {
        const data = super.getData();
        console.log("My Custom Sheet | getData() chiamato!", data);

        // Puoi aggiungere dati personalizzati qui
        return data;
    }

    /** @override */
    activateListeners(html) {
        super.activateListeners(html);

        // Gestisci gli eventi personalizzati qui
    }
}