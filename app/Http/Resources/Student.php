<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Student extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'Codigo'            => (int) $this->id,
            'Nome'              => $this->name,
            'Nascimento'        => $this->birth,
            'Genero'            => $this->gender,
            'Sala'              => new CLassroom($this->whenLoaded('classroom')),
            'links'             => [
                                    [
                                        'type'      => 'GET',
                                        'rel'       => 'self',
                                        'url'       => route('students.show',$this->id)
                                    ],
                                    [
                                        'type'      => 'UPDATE',
                                        'rel'       => 'update',
                                        'url'       => route('students.update',$this->id)
                                    ],
                                    [
                                        'type'      => 'DELETE',
                                        'rel'       => 'delete',
                                        'url'       => route('students.destroy',$this->id)
                                    ]
            ]
        ];
    }
}
