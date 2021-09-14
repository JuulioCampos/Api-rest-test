<?php

namespace App\Http\Resources;

use GuzzleHttp\Promise\Create;
use Illuminate\Http\Resources\Json\ResourceCollection;
use PhpParser\ErrorHandler\Collecting;

class StudentCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
        'dados' => $this->collection,
        'links' => [
            'self' => [
                        'JulioCampos',
                        'create'=>route('students.store')
                ]
            ]
        ];
    }
}
