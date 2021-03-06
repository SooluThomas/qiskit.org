/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

import { LitElement, html, css } from 'lit-element';
import { localize } from '../pwa-helpers/i18next-localize-mixin.js';

import { i18next } from '../i18next.js';

import {
  SharedStyles,
  HeaderStyles,
  SectionStyles,
  SectionElementStyles,
  StackListStyles,
} from './app-shared-styles.js';
import { githubIcon } from './app-icons.js';
import './vaadin-ibmq-styles/vaadin-button.js';
import '@kuscamara/code-sample/code-sample.js';

import { trackClickEvent } from '../helpers/track-events.js';

class PageAqua extends localize(i18next)(LitElement) {
  static get styles() {
    return [
      SharedStyles,
      HeaderStyles,
      SectionStyles,
      SectionElementStyles,
      StackListStyles,
      css`
        :host {
          --app-section-background-color: var(--qiskit-aqua-color);
          --app-section-color: #000000;
        }

        section.colored .row .description .actions vaadin-button {
          --ibmq-button-secondary-color: #000000;
          --ibmq-button-secondary-focus-color: var(--qiskit-aqua-color);
        }

        .stack-list .element.dot::before {
          width: 0.682em;
          height: 0.682em;
          border-radius: 50%;
          left: -1.4em;
        }
      `,
    ];
  }

  render() {
    // prettier-ignore
    return html`
      <header>
        <img src="images/qiskit-aqua-logo.png" .alt=${i18next.t('pages.aqua.altLogo')}>
        <div>
          <h1>
            ${i18next.t('pages.aqua.headerTitle')}
          </h1>
          <h2>${i18next.t('pages.aqua.headerSubTitle')}</h2>
          <div class="badges">
            <a
              href="https://github.com/Qiskit/qiskit-aqua"
              target="_blank"
              rel="noopener"
              tabindex="-1"
              @click=${() => trackClickEvent({
                action: 'Qiskit Aqua: GitHub Repository',
                objectType: 'Button'
              })}
            >
              <vaadin-button theme="secondary small">${githubIcon} GitHub</vaadin-button>
            </a>
          </div>
        </div>
      </header>

      <section class="colored">
        <div class="row limited-width">
          <div class="description">
            <h3>${i18next.t('pages.aqua.aboutTitle')}</h3>
            <p>${i18next.t('pages.aqua.aboutDescription')}</p>
            <h3>${i18next.t('pages.aqua.stackTitle')}</h3>
            <div class="stack-list">
              <div class="element">
                <div class="title">Qiskit Aqua Translators</div>
                <div class="subtitle">Chemistry, AI, Optimization, Finance</div>
              </div>
              <div class="element">
                <div class="title">Quantum Algorithms</div>
                <div class="subtitle">QPE, Grover, HHL, QSVM, VQE, QAOA, ...</div>
              </div>
              <div class="element">
                <div class="title">Qiskit Terra</div>
                <div class="subtitle">Compile Circuits</div>
              </div>
              <div class="element dot">
                <div class="title">Providers</div>
                <div class="subtitle">Qiskit Aer, IBM Q, Third Party</div>
              </div>
            </div>
          </div>
          <div class="illustration">
            <h3>${i18next.t('pages.aqua.exampleTitle')}</h3>
            <code-sample
              type="python"
              copy-clipboard-button
              @click=${() => trackClickEvent({
                action: 'Qiskit Aqua: Copy Code Sample',
                objectType: 'Button'
              })}
            >
              <!-- htmlmin:ignore -->
              <template>
                from qiskit import Aer
                from qiskit.aqua.components.oracles import LogicalExpressionOracle
                from qiskit.aqua.algorithms import Grover

                sat_cnf = """
                c Example DIMACS 3-sat
                p cnf 3 5
                -1 -2 -3 0
                1 -2 3 0
                1 2 -3 0
                1 -2 -3 0
                -1 2 3 0
                """

                backend = Aer.get_backend('qasm_simulator')
                oracle = LogicalExpressionOracle(sat_cnf)
                algorithm = Grover(oracle)
                result = algorithm.run(backend)

                print(result["result"])
              </template>
              <!-- htmlmin:ignore -->
            </code-sample>
          </div>
        </div>
      </section>
    `;
  }
}

window.customElements.define('page-aqua', PageAqua);
