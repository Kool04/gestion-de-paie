<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RecuRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {

        if (request()->isMethod('post')) {
            return [

                'num_emp' => 'required',
                'type' => 'required|string|',
                'montant' => 'required|string|',
            ];
        } else {
            return [

                'type' => 'required|string|',
                'montant' => 'required|string|',
            ];
        }
    }

    public function messages()
    {
        if (request()->isMethod('post')) {
            return [
                'num_emp' => 'numero de l\'employer obligatoire',
                'type' => 'type de payment obligatoire',
                'montant' => 'montant obligatoire',
            ];
        } else {
            return [
                'num_emp' => 'numero de l\'employer obligatoire',
                'type' => 'type de payment obligatoire',
                'montant' => 'montant obligatoire',
            ];
        }
    }
}
