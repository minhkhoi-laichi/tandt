function TandT() {
    var self = this;
    this.json_url = 'https://minhkhoi-laichi.github.io/tandt/json/products.json';

    this.loadJSON = function() {
        $.getJSON(self.json_url, {dataType : 'json'}, function(data){
            self.create_product_tab(data);
        }).fail(function(){
            console.log("Lỗi load json.");
        });
    }

    this.product_item = function(object) {
        let price = '';
        if(object.giam == 0) {
            price = '<div class="price-box">' +
                '<span class="regular-price">' +
                    '<span class="price">'+ self.format_currency(object.gia) +' đ</span> </span>' +
                '</div>';
        } else {
            price = '<p class="old-price">' +
                '<span class="price-label">Giá củ:</span>' +
                '<span class="price" >'+self.format_currency(object.gia)+' đ</span>' +
            '</p>' +
            '<p class="special-price">' +
                '<span class="price-label">Giá mới</span>' +
                '<span class="price" content="90">'+self.format_currency(object.gia - (object.gia*object.giam/100))+' đ</span>' +
            '</p>';
        }

        let image_hover = (object.hinh_anh_khac == '') ? object.hinh_anh : object.hinh_anh_khac;

        let item = 
        '<div class="item">'+
            '<div class="product-item">' +
                '<div class="product-shop-top">' +
                    '<a href="#" title=" '+ object.ten_sp+'" class="product-image">' +
                        '<ul class="productlabels_icons">' +
                            ( (object.hot) ? '<li class="label hot"><p>Hot</p></li>': '') +
                            ( (object.giam == 0) ? '' : ('<li class="label special"><p><span>-'+object.giam+'%</span></p></li>') ) +
                        '</ul>' +
                        '<img style="" class="em-alt-hover img-responsive em-lazy-loaded" src="'+ image_hover +'" data-original="'+ image_hover +'" alt=" '+ object.ten_sp+'" height="350" width="350">' +
                        '<img class="img-responsive em-alt-org em-lazy-loaded" src="'+ object.hinh_anh+'" data-original="'+ object.hinh_anh+'" alt=" '+ object.ten_sp+'" height="350" width="350">' +
                    '</a>' +
                    '<div class="em-element-display-hover bottom">' +
                        '<div class="quickshop-link-container">' +
                            '<a href="#" class="quickshop-link" title="Xem chi tiết">Xem chi tiết</a>' +
                        '</div>' +
                    '</div>' +
                '</div>' +

                '<div class="product-shop">' +
                    '<div class="f-fix">' +
                        '<h3 style="min-height: 19px;" class="product-name"><a href="#" title=" '+ object.ten_sp+'"> '+ object.ten_sp+'</a></h3>' +
                        '<div class="price-box">' +
                            price +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>';

        return item;
    }

    this.create_product_tab = function(data) {
        let type = data.loai_sp;
        let product = data.san_pham;
        let panel = '';
        let tab = '';
        let content = '';
        if(type) {
            let index = 0;
            panel +=
            '<ul class="em-tabs-control tabs-control r-tabs-nav">';
            $.each(type, function(key, value) {
                let item = '';
                tab += '<li class="r-tabs-tab '+ ((index==0)? 'r-tabs-state-active': 'r-tabs-state-default') +'">' +
                        '<a class="r-tabs-anchor '+ ((index==0)?'active' : '') +'" href="#'+key+'" data-hover="'+value+'"><span class="icon"></span>'+value+'</a>' +
                    '</li>';
                
                    $.each(product[key], function(k, v){
                        item += self.product_item(v);
                    });
                content += '<div class="r-tabs-accordion-title '+ ((index==0)?'active' : '') +'">' +
                                '<a class="r-tabs-anchor" href="#'+key+'"> <span class="icon '+key+'"></span>'+value+'</a>' +
                            '</div>' +
                        '<div id="'+key+'" class="tab-pane tab-item content_'+key+' r-tabs-panel ' + ((index==0)? 'r-tabs-state-active': 'r-tabs-state-default') +'">' +
                            '<div class="wrapper button-show01 button-hide-text em-wrapper-loaded">' +
                                '<div class="emfilter-ajaxblock-loaded">' +
                                    '<div id="em_fashion_new_arrivals_tab0'+(index + 1)+'" class="em-grid-20 ">' +
                                        '<div class="widget em-filterproducts-grid">' +
                                            '<div class="widget-products em-widget-products">' +
                                                '<div class="emcatalog-desktop-4" id="em-grid-mode-em_fashion_new_arrivals_tab0'+(index + 1)+'">' +
                                                    '<div class="products-grid ">' +
                                                    item +
                                                    '</div>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>';                
                index++;
            });

            panel+= tab + '</ul>';
            panel+= '<div class="em-tabs-content tab-content">' + content + '</div>';
        }

        // console.log(panel);
        $('#emtabs_1').html(panel);
        self.show_tab();
    }

    this.format_currency = function(input) {
        return parseInt(input).toLocaleString();
    }

    this.show_tab = function() {
        /* New Arrival Tabs */
        $('#emtabs_1').responsiveTabs({
            animation: 'fade',
            startCollapsed: 'accordion',
            active: 0,
            activateState: function(e, state) {
                if (state.newState == 'accordion') {
                    var ulTab = $(this).find("ul.r-tabs-nav");
                    var activeTab = $(this).find("div.r-tabs-state-active");
                    if (activeTab.length == 0) {
                        $(ulTab).find("li:first-child a").click();
                    }
                }
            },
            activate: function(event, tab) {
                var id = tab.id + 1;
                var $_img = $('#tab_emtabs_1_' + id).find('img.em-img-lazy');
                $_img.trigger("appear");
                var $_eheight = $('#tab_emtabs_1_' + id).find('.em-filterproducts-grid');
                setEqualElement($_eheight, '.product-name');
            },
        });
    }

    this.init = function() {
        console.log('load init');
        self.loadJSON();
    }

    this.init();
}

$(function() {
    new TandT();
});