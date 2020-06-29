(function() {
    document.addEventListener("DOMContentLoaded", function () {
        sendData( {} );

        let createRootButton = document.querySelector('[js-data-create]');
        let conteiner = document.querySelector('[js-data-append]');
        createRootButton.addEventListener('click', function () {
            if (conteiner.innerHTML.trim() === '') {
                sendData( {nodeName: 'Root', isRoot: true} );
            }
        });

        conteiner.addEventListener( 'click', function(event) {
            if (event.target.matches('[js-data-add]')) {
                let parentId = event.target.parentNode.getAttribute('id');
                sendData( {nodeName: 'Node', parentId: parentId} );
            } else if (event.target.matches('[js-data-remove]')) {
                let nodeId = event.target.parentNode.getAttribute('id');
                let confirmDeleteRoot = true;
                if (event.target.matches('[js-data-root]')) {
                    confirmDeleteRoot = false;
                    let timerElement = document.querySelector('#time');
                    let modals = document.querySelectorAll('[js-data-modal]');
                    let duration = 20;
                    let timerId = startTimer(duration-1, timerElement, modals);
                    showModals(modals);

                    let rootDeleteButton = document.querySelector('[js-data-modal-yes]');
                    rootDeleteButton.addEventListener('click', function() {
                        confirmDeleteRoot = true;
                        hideModals(modals, timerId, timerElement, duration);
                        sendData({nodeId: nodeId});
                    });

                    let rootCancelDeleteButton = document.querySelector('[js-data-modal-no]');
                    rootCancelDeleteButton.addEventListener('click', function() {
                        for (let i = 0; i < modals.length; i++) {
                            hideModals(modals, timerId, timerElement, duration);
                        }
                    });
                }

                if (confirmDeleteRoot) {
                    sendData({nodeId: nodeId});
                }
            } else if (event.target.matches('[js-data-title]')) {
                let nodeId = event.target.parentNode.getAttribute('id');
                let newName = prompt('New name', '');
                if (newName !== '' && newName !== null ) {
                    sendData({nodeId: nodeId, newName: newName});
                }
            } else if (event.target.matches('[js-toggle]')) {
                let toggle = event.target;
                toggle.classList.toggle("tree-toggle-closed");
                toggle.classList.toggle("tree-toggle-opend");
            }
        });

        function sendData( data ) {
            let XHR = new XMLHttpRequest();
            let urlEncodedData = "";
            let urlEncodedDataPairs = [];
            let name;

            for( name in data ) {
                urlEncodedDataPairs.push( encodeURIComponent( name ) + '=' + encodeURIComponent( data[name] ) );
            }

            urlEncodedData = urlEncodedDataPairs.join( '&' ).replace( /%20/g, '+' );

            XHR.open( 'POST', '/requestAction.php', true);
            XHR.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
            XHR.send( urlEncodedData );

            XHR.responseType = 'json';

            XHR.onload = function() {
                let treeData = XHR.response;
                let conteiner = document.querySelector('[js-data-append]');
                conteiner.innerHTML = '';
                if (treeData === []) {
                    return;
                } else if (treeData.length > 0) {
                    let ulMain = document.createElement('ul');
                    ulMain.classList.add('tree-list-unstyled');
                    for(var i in treeData) {
                        let rootAttribute = '';
                        if (+i === 0) {
                            rootAttribute = 'js-data-root'
                        }
                        let li = document.createElement('li');
                        li.setAttribute('id', treeData[i].id);
                        li.innerHTML = '<h5 js-data-title="">' + treeData[i].name + '</h5>'
                            + '<a href="#" class="badge badge-danger" js-data-remove="" ' + rootAttribute + '>-</a>'
                            + '<a href="#" class="badge badge-success" js-data-add="">+</a>';
                        if (treeData[i].parent_id != null) {
                            let parent = document.getElementById(treeData[i].parent_id);
                            let parentUl = parent.getElementsByTagName('ul')[0];
                            if (parentUl) {
                                parentUl.appendChild(li);
                            } else {
                                let parentUl = document.createElement('ul');
                                parentUl.classList.add('tree-list-unstyled');
                                parentUl.appendChild(li);
                                parent.appendChild(parentUl);
                                parent.classList.add('tree-toggle-opend');
                                parent.setAttribute('js-toggle', '');
                            }
                        } else {
                            ulMain.appendChild(li);
                            conteiner.append(ulMain);
                        }
                    }
                }
            };
        }

        function startTimer(duration, timerElement, modals) {
            let timer = duration;
            let timerId = setInterval(function () {
                timerElement.textContent = timer;
                if (--timer < 0) {
                    hideModals(modals);
                }
            }, 1000);

            return timerId;
        }

        function showModals(modals) {
            for (let i = 0; i < modals.length; i++) {
                modals[i].classList.remove('d-none');
                modals[i].classList.add('d-block');
                modals[i].classList.add('show');
            }
        }

        function hideModals(modals, timerId, timerElement, duration) {
            clearInterval(timerId);
            timerElement.textContent = duration;
            for (let i = 0; i < modals.length; i++) {
                modals[i].classList.add('d-none');
                modals[i].classList.remove('d-block');
                modals[i].classList.remove('show');
            }
        }
    });
}());
