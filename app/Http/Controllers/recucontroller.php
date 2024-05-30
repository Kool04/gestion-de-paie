<?php

namespace App\Http\Controllers;

use App\Http\Requests\RecuRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class recucontroller extends Controller
{
    public function indexPayment()
    {
        $marches = DB::table('payment')->get();

        return response()->json([
            'results' => $marches
        ], 200);
    }

    public function storePayment(RecuRequest $request)
    {
        try {
            $date = now();
            DB::table('payment')->insert([
                'num_payment' => $request->num_payment,
                'num_emp' => $request->num_emp,
                'type' => $request->type,
                'montant' => $request->montant,
                'date' => $date,
            ]);

            return response()->json([
                'message' => "Payment effectue ajouté avec succès."
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Erreur lors du payment : " . $e->getMessage()
            ], 500);
        }
    }

    public function supprimerPayment($num_payment)
    {

        try {
            $num_payment = intval($num_payment);
            $payment = DB::table('payment')->where('num_payment', $num_payment)->first();

            if (!$payment) {
                return response()->json([
                    'message' => 'Le marché public avec le numéro ' . $num_payment . ' n\'existe pas.'
                ], 404);
            }

            DB::table('employe')->where('num_payment', $num_payment)->delete();

            return response()->json([
                'message' => "Payment annuler."
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Erreur lors de la suppression."
            ], 500);
        }
    }

    public function showPayment($num_payment)
    {
        $num_payment = intval($num_payment);

        $liste = DB::table('payment')->where('num_payment', $num_payment)->get()->first();

        if (!$liste) {
            return response()->json([
                'code' => 404,
                'message' => 'Le numero payment avec le numéro ' . $num_payment . ' n\'existe pas.'

            ], 404);
        }

        return response()->json([
            'liste' => $liste
        ], 200);
    }
}
