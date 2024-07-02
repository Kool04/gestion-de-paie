<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class paymentRequest extends FormRequest
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
                'nom' => 'required|string|',
                'prenom' => 'required|string|',
                'cin' => 'required|string|unique:employe,cin|digits:12',
                'poste' => 'required|string|',
                'lieu' => 'required|string|',
                'num_carte' => 'required|string|unique:employe,num_carte',
                'num_tel' => 'required|string|unique:employe,num_tel',
                'adresse' => 'required|string|',
                'email' => 'required|string|unique:employe,email',
                'salaire_base' => 'required|numeric|min:200000',
            ];
        } else {
            return [
                'num_emp' => 'required',
                'nom' => 'required|string|',
                'prenom' => 'required|string|',
                'cin' => 'required|string|digits:12',
                'poste' => 'required|string|',
                'lieu' => 'required|string|',
                'num_carte' => 'required|string|',
                'num_tel' => 'required|string|',
                'adresse' => 'required|string|',
                'email' => 'required|string|',
                'salaire_base' => 'required|numeric|min:200000',
            ];
        }
    }

    public function messages()
    {
        if (request()->isMethod('post')) {
            return [
                'num_emp' => 'Numero de lemploye obligatoire',
                'nom' => 'Nom de lemploye Obligatoire',
                'prenom' => 'prenom de lemploye Obligatoire',
                'cin.required' => 'Le CIN est requis.',
                'cin.unique' => 'Le CIN existe déjà.',
                'cin.digits' => 'Le CIN doit etre 12 chiffres.',
                'poste' => 'poste obligatoire',
                'lieu' => 'lieu obligatoire',
                'num_carte.required' => 'Le numéro de carte est requis.',
                'num_carte.unique' => 'Le numéro de carte existe déjà.',
                'num_tel.required' => 'numero tel obligatoire',
                'num_tel.unique' => 'numero tel obligatoire',
                'email.unique' => 'adresse mail existe deja',
                'email.required' => 'adresse mail est obligatoire',
                'salaire_base' => 'salaire obligatoire et superieur a 200000Ar',
            ];
        } else {
            return [
                'num_emp' => 'Numero de lemploye obligatoire',
                'nom' => 'Nom de lemploye Obligatoire',
                'prenom' => 'prenom de lemploye Obligatoire',
                'cin.required' => 'Le CIN est requis.',
                'poste' => 'poste obligatoire',
                'lieu' => 'lieu obligatoire',
                'num_carte.required' => 'Le numéro de carte est requis.',
                'num_carte.unique' => 'Le numéro de carte existe déjà.',
                'num_tel.required' => 'numero tel obligatoire',
                'email.required' => 'adresse mail est obligatoire',
                'salaire_base' => 'salaire obligatoire et superieur a 200000Ar',
            ];
        }
    }
}
