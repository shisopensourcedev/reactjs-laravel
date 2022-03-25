<?php

namespace App\Http\Controllers\api;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;


use App\Models\User;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
	public $successStatus = 200;
	public $internalErrorStatus = 500;


	/**
	 * Display a listing of the resource.
	 * @return Response
	 */
	public function index()
	{
		$data = array();
		$code = '';
		$message = '';
		try {
			$all_addresses = User::all();

			if (sizeof($all_addresses) >= 1) {
				$data = $all_addresses;
				$code = $this->successStatus;
				$message = 'Success';
			} else {
				$code = $this->successStatus;
				$message = 'No records founds';
			}

			$response = array(
				'data' => $data,
				'message' => $message,
				'status' => $code
			);
		} catch (Exception $e) {
			$response = array(
				'message' => 'Some internal error. Try after sometime.',
				'status' => $this->internalErrorStatus
			);
		}

		return response()->json($response, 200);
	}

	/**
	 * Display a listing of the resource.
	 * @return Response
	 */
	public function store(Request $request)
	{
		$code = '';
		$message = '';
		try {
			$validator = Validator::make($request->all(), [
				'fullname' => 'required|max:255',
				'email' => 'required',
			]);

			if ($validator->fails()) {
				$errors = $validator->errors();
				$fullname = $errors->get('fullname');
				$email = $errors->get('email');

				if (!empty($fullname)) {
					return response()->json(['error' => $fullname[0]], 401);
				}
				if (!empty($email)) {
					return response()->json(['error' => $email[0]], 401);
				}
			}

			$input = $request->all();
			$message = 'successfully!';

			$user = new User;
			$user->fullname = isset($input['fullname']) ? $input['fullname'] : '';
			$user->email = isset($input['email']) ? $input['email'] : '';
			$user->save();

			$response = array(
				'data' => $user,
				'message' => $message,
				'status' => $code
			);
		} catch (Exception $e) {
			$response = array(
				'message' => 'Some internal error. Try after sometime.',
				'status' => $this->internalErrorStatus
			);
		}

		return response()->json($response, 200);
	}
}
