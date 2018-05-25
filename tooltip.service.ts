import { Injectable } from '@angular/core';
import * as $ from 'jquery';
import {Observable} from 'rxjs/Observable';

@Injectable()


export class TooltipService {

constructor() {}

public tooltipmessageservice()
{


console.log("in tooltip service");

  let targets:any = $( '[rel~=tooltip]' );
  let target: any = false;
  let tooltip:any = false;
  let title:any = false;
  let tip:any;
  let tiphtml:any;


  $("a[rel=tooltip].inline").html("<svg aria-hidden=\"true\" class=\"icon-info\" ><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-info\"></use></svg>");
 

 $(document).on('click','[rel~=tooltip]', function(e) {
    e.preventDefault();
 });
 $(document).on('mouseenter', '[rel~=tooltip]', function(e)
    {
      
      target  = $( this );
      tiphtml    = $( this ).attr( 'title' );
      if((tiphtml !=null) && (tiphtml !=undefined)){
      tip = tiphtml.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g," \" ");}


      tooltip = $( '<div id="tooltip"></div>' );
      if( !tip || tip == '' )
      return false;
      target.removeAttr( 'title' );
      tooltip.css( 'opacity', 0 ).html( tip ).appendTo( 'body' );

      let init_tooltip = function(){
        if ( $( window ).width() < 768 ) {
            tooltip.css( 'max-width', 240 );
        }
        else {tooltip.css( 'max-width', 260 );}
       let pos_left = target.offset().left + ( target.outerWidth() / 2 ) - ( tooltip.outerWidth() / 2 );
       let pos_top  = target.offset().top - tooltip.outerHeight() - 20;
       if( pos_top - $(window).scrollTop() < 0)
       {
            pos_top  = target.offset().top + target.outerHeight();
           tooltip.addClass( 'top' );
       }
       else tooltip.removeClass( 'top' );

       tooltip.css( { left: pos_left, top: pos_top } ).animate( { top: '+=10', opacity: 1 }, 50 );

      }

      init_tooltip();
      $( window ).resize( init_tooltip );
      let remove_tooltip = function()
      {
          tooltip.animate( { top: '-=10', opacity: 0 }, 50, function(){$( this ).remove();});
          target.attr( 'title', tip );
          target.clone(true).insertAfter(target);
          target.remove();
      };
      target.on( 'mouseleave', remove_tooltip );
      $('*:not([rel~=tooltip])').on('touchstart', function() {
        remove_tooltip();
      });

    });
  return null;
  }


}

