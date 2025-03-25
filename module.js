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
            template: null, // Elimina il riferimento al file HTML
            width: 800,
            height: 700,
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "attributes" }]
        });
    }

    /** @override */
    getData() {
        const data = super.getData();
        console.log("My Custom Sheet | getData() chiamato!", data);

        // Calcola i modificatori di caratteristica
        data.strModifier = Math.floor((data.actor.data.data.abilities.str.value - 10) / 2);
        data.dexModifier = Math.floor((data.actor.data.data.abilities.dex.value - 10) / 2);
        data.conModifier = Math.floor((data.actor.data.data.abilities.con.value - 10) / 2);
        data.intModifier = Math.floor((data.actor.data.data.abilities.int.value - 10) / 2);
        data.wisModifier = Math.floor((data.actor.data.data.abilities.wis.value - 10) / 2);
        data.chaModifier = Math.floor((data.actor.data.data.abilities.cha.value - 10) / 2);

        return data;
      }

      /** @override */
      activateListeners(html) {
          super.activateListeners(html);

          // Elimina tutto il contenuto esistente
          html.empty();

          // Crea un elemento h1 per il nome del personaggio
          const nameElement = $("<h1>" + this.actor.name + "</h1>");

          // Crea un div per gli attributi
          const attributesDiv = $("<div class='attributes'></div>");

          // Funzione per creare un elemento attributo
          const createAttributeElement = (ability, value, modifier) => {
              return $(`
                  <div class='attribute'>
                      <label>${ability}</label>
                      <span>${value}</span>
                      <span>(${modifier})</span>
                  </div>
              `);
          };

          // Crea elementi per ogni attributo
          const strElement = createAttributeElement("Forza", this.actor.data.data.abilities.str.value, this.getData().strModifier);
          const dexElement = createAttributeElement("Destrezza", this.actor.data.data.abilities.dex.value, this.getData().dexModifier);
          const conElement = createAttributeElement("Costituzione", this.actor.data.data.abilities.con.value, this.getData().conModifier);
          const intElement = createAttributeElement("Intelligenza", this.actor.data.data.abilities.int.value, this.getData().intModifier);
          const wisElement = createAttributeElement("Saggezza", this.actor.data.data.abilities.wis.value, this.getData().wisModifier);
          const chaElement = createAttributeElement("Carisma", this.actor.data.data.abilities.cha.value, this.getData().chaModifier);

          // Aggiungi gli elementi degli attributi al div degli attributi
          attributesDiv.append(strElement, dexElement, conElement, intElement, wisElement, chaElement);

          // Aggiungi gli elementi alla scheda
          html.append(nameElement, attributesDiv);
      }
    }
