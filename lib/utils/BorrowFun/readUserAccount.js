import * as anchor from "@project-serum/anchor";
import getProvider from "../../helpers/getProvider";
import idl from "../../idls/cbs_protocol.json";
import { cbs_name } from "../../helpers/constants/cbs_constants";
import { convert_from_wei } from "../../helpers/constants/common";

export const readUserAccount = async (wallet) => {
  try {
    const { PublicKey } = anchor.web3;
    const userAuthority = wallet.publicKey;

    const provider = await getProvider(wallet);
    anchor.setProvider(provider);

    const programId = new PublicKey(idl.metadata.address);
    const program = new anchor.Program(idl, programId);

    const [userAccount, userAccountBump] = await PublicKey.findProgramAddress(
      [Buffer.from(cbs_name), Buffer.from(userAuthority.toBuffer())],
      programId
    );

    const accountData = await program.account.userAccount.fetch(userAccount);

    const userAccountInfo = {
      //deposited
      DepositedSolAmount: convert_from_wei(accountData.solAmount?.toString()),
      DepositedBtcAmount: convert_from_wei(accountData.btcAmount?.toString()),
      DepositedUsdcAmount: convert_from_wei(accountData.usdcAmount?.toString()),
      DepositedMSOLAmount: convert_from_wei(accountData.msolAmount?.toString()),
      DepositedETHAmount: convert_from_wei(accountData.ethAmount?.toString()),
      DepositedSRMAmount: convert_from_wei(accountData.srmAmount?.toString()),
      DepositedUSDTAmount: convert_from_wei(accountData.usdtAmount?.toString()),
      DepositedstSOLAmount: convert_from_wei(
        accountData.stsolAmount?.toString()
      ),
      DepositedscnSOLAmount: convert_from_wei(
        accountData.scnsolAmount?.toString()
      ),

      LendingSolAmount: 0,
      LendingBtcAmount: convert_from_wei(
        accountData.lendingBtcAmount?.toString()
      ),
      LendingUsdcAmount: convert_from_wei(
        accountData.lendingUsdcAmount?.toString()
      ),
      LendingMSOLAmount: convert_from_wei(
        accountData.lendingMsolAmount?.toString()
      ),
      LendingETHAmount: convert_from_wei(
        accountData.lendingEthAmount?.toString()
      ),
      LendingSRMAmount: convert_from_wei(
        accountData.lendingSrmAmount?.toString()
      ),
      LendingUSDTAmount: convert_from_wei(
        accountData.lendingUsdtAmount?.toString()
      ),

      LendingstSOLAmount: convert_from_wei(
        accountData.lendingStsolAmount?.toString()
      ),
      LendingscnSOLAmount: convert_from_wei(
        accountData.lendingScnsolAmount?.toString()
      ),

      DepositedLpSolAmount: convert_from_wei(
        accountData.lpsolAmount?.toString()
      ),
      DepositedLpUsdAmount: convert_from_wei(
        accountData.lpusdAmount?.toString()
      ),

      DepositedLpBTCAmount: convert_from_wei(
        accountData.lpbtcAmount?.toString()
      ),

      DepositedLpETHAmount: convert_from_wei(
        accountData.lpethAmount?.toString()
      ),

      //borrowed
      BorrowedLpSOLAmount: convert_from_wei(
        accountData.borrowedLpsol?.toString()
      ),
      BorrowedLpUsdAmount: convert_from_wei(
        accountData.borrowedLpusd?.toString()
      ),

      BorrowedLpBTCAmount: convert_from_wei(
        accountData.borrowedLpbtc?.toString()
      ),
      BorrowedLpETHAmount: convert_from_wei(
        accountData.borrowedLpeth?.toString()
      ),
    };

    return userAccountInfo;
  } catch (err) {
    console.log(err);

    const userAccountInfo = {
      //deposited
      DepositedSolAmount: 0,
      DepositedBtcAmount: 0,
      DepositedUsdcAmount: 0,
      DepositedMSOLAmount: 0,
      DepositedETHAmount: 0,
      DepositedSRMAmount: 0,
      DepositedUSDTAmount: 0,
      DepositedstSOLAmount: 0,
      DepositedscnSOLAmount: 0,
      LendingSolAmount: 0,
      LendingBtcAmount: 0,
      LendingUsdcAmount: 0,
      LendingMSOLAmount: 0,
      LendingETHAmount: 0,
      LendingSRMAmount: 0,
      LendingUSDTAmount: 0,
      LendingstSOLAmount: 0,
      LendingscnSOLAmount: 0,
      DepositedLpSolAmount: 0,
      DepositedLpUsdAmount: 0,
      DepositedLpBTCAmount: 0,
      DepositedLpETHAmount: 0,
      //borrowed
      BorrowedLpSOLAmount: 0,
      BorrowedLpUsdAmount: 0,
      BorrowedLpBTCAmount: 0,
      BorrowedLpETHAmount: 0,
    };
    return userAccountInfo;
  }
};
