<?php

namespace App\Http\Controllers;

use App\Http\Requests\paymentRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class paymentcontroller extends Controller
{


    public function index()
    {
        $employes = DB::table('employe')->get();

        // Ajoutez le lien complet de l'image à chaque employé
        $employes->transform(function ($employe) {
            $employe->photo_path = $employe->photo_path ? Storage::url($employe->photo_path) : null;
            return $employe;
        });

        return response()->json([
            'results' => $employes
        ], 200);
    }


    public function storeEmp(paymentRequest $request)
    {
        try {
            if ($request->hasFile('photo_path')) {
                // Enregistrer l'image dans le dossier de stockage public
                $path = $request->file('photo_path')->store('images', 'public');
            } else {
                // Si aucun fichier n'a été téléchargé, définir le chemin sur null
                $path = null;
            }

            $salaire_base = $request->salaire_base;

            $salaire_fin = $request->filled('salaire_fin') ? $request->salaire_fin : $salaire_base;

            DB::table('employe')->insert([
                'num_emp' => $request->num_emp,
                'nom' => $request->nom,
                'prenom' => $request->prenom,
                'cin' => $request->cin,
                'poste' => $request->poste,
                'lieu' => $request->lieu,
                'num_tel' => $request->num_tel,
                'num_carte' => $request->num_carte,
                'adresse' => $request->adresse,
                'email' => $request->email,
                'salaire_base' => $salaire_base,
                'salaire_fin' => $salaire_fin,
                'photo_path' => $path, // Utilisez le chemin d'accès de l'image téléchargée
            ]);

            return response()->json([
                'message' => "Employé ajouté avec succès."
            ], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Capturer les erreurs de validation
            $errors = $e->validator->errors()->toArray();
            // Renvoyer les erreurs de validation au front-end
            return response()->json([
                'errors' => $errors,
                'message' => "Erreur lors de la validation des données."
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Erreur lors de l'ajout de l'employé : " . $e->getMessage()
            ], 500);
        }
    }


    public function modifier(paymentRequest $request, $num_emp)
    {
        try {
            $num_emp = intval($num_emp);
            $liste = DB::table('employe')->where('num_emp', $num_emp)->get()->first();

            if (!$liste) {
                return response()->json([
                    'message' => 'Le marché public avec le numéro ' . $num_emp . ' n\'existe pas.'
                ], 404);
            }

            DB::table('employe')->where('num_emp', $num_emp)->update([
                //'num_emp' => $request->num_emp,
                'nom' => $request->nom,
                'prenom' => $request->prenom,
                'cin' => $request->cin,
                'poste' => $request->poste,
                'lieu' => $request->lieu,
                'num_tel' => $request->num_tel,
                'num_carte' => $request->num_carte,
                'adresse' => $request->adresse,
                'email' => $request->email,
                'salaire_base' => $request->salaire_base,
                'salaire_fin' => $request->salaire_fin,
                'photo_path' => $request->photo_path,
            ]);

            return response()->json([
                'message' => "Marché modifié avec succès."
            ], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {

            $errors = $e->validator->errors()->toArray();

            return response()->json([
                'errors' => $errors,
                'message' => "Erreur lors de la validation des données."
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Erreur lors de l'ajout de l'employé : " . $e->getMessage()
            ], 500);
        }
    }


    public function supprimer($num_emp)
    {

        try {
            $num_emp = intval($num_emp);
            $liste = DB::table('employe')->where('num_emp', $num_emp)->first();

            if (!$liste) {
                return response()->json([
                    'message' => 'Le marché public avec le numéro ' . $num_emp . ' n\'existe pas.'
                ], 404);
            }

            DB::table('employe')->where('num_emp', $num_emp)->delete();

            DB::table('action')->where('num_emp', $num_emp)->delete();
            DB::table('payment')->where('num_emp', $num_emp)->delete();

            return response()->json([
                'message' => "Employer supprimé avec succès."
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Erreur lors de la suppression."
            ], 500);
        }
    }


    public function show($num_emp)
    {
        $num_emp = intval($num_emp);

        $liste = DB::table('employe')->where('num_emp', $num_emp)->get()->first();

        if (!$liste) {
            return response()->json([
                'code' => 404,
                'message' => 'Le marché public avec le numéro ' . $num_emp . ' n\'existe pas.'

            ], 404);
        }

        return response()->json([
            'liste' => $liste
        ], 200);
    }
}
