<?php

namespace App\Actions\Public;

use App\Domain\Contracts\Responders\IndexResponder;
use Serenity\Action;
use Serenity\Routing\Attributes\Route;

class IndexAction extends Action
{
  /**
   * Create a new instance of the action.
   *
   * @param  IndexResponder  $responder
   */
  public function __construct(protected IndexResponder $responder)
  {
    $this->with('Welcome');
  }

  #[Route(name: 'home')]
  public function __invoke()
  {
    //dd(app());

    return $this->responder->send();
  }
}
