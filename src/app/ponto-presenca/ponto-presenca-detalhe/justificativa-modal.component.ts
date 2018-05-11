import { Component } from '@angular/core';
import {SuiModal, ComponentModalConfig, ModalSize} from 'ng2-semantic-ui';


interface IConfirmModalContext {
    title: string;
    question: string;
}

@Component({
    selector: 'modal-confirm',
    template: `
<div class="header">{{ modal.context.title }}</div>
<div class="content">
    <p>{{ modal.context.question }}</p>
    
                 <form class="ui form">

                  <div class="ui stackable one column grid">

                    <div class="column">
                      <label>Justificativa</label>
                      <textarea style="margin-top: 0px; margin-bottom: 0px; height: 112px;" #justificativa value="justificativa" value="justificativa" placeholder="Escreva sua justificativa aqui..."></textarea>
                    </div>
                    
                  </div>

                  </form>
</div>
<div class="actions">
    <button class="ui red button" (click)="modal.deny(undefined)">Cancel</button>
    <button class="ui green button" (click)="modal.approve(rejeitar(justificativa.value))" autofocus>OK</button>
</div>
`
})
export class JustificativaModalComponent {
    constructor(public modal: SuiModal<IConfirmModalContext, void, void>) {}

    rejeitar(justificativa) {
        console.log(justificativa);
    }
}

export class JustifmModal extends ComponentModalConfig<IConfirmModalContext, void, void> {
    constructor(title: string, question: string, size = ModalSize.Normal) {
        super(JustificativaModalComponent, { title, question });

        this.isClosable = false;
        this.transitionDuration = 200;
        this.size = size;
    }
}